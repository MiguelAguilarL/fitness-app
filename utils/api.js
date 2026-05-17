import AsyncStorage from '@react-native-async-storage/async-storage';

const EXERCISE_QUERY_CACHE_STORAGE_KEY = '@fitness-app:exercise-search-cache:v1';
const SESSION_QUERY_CACHE = new Map();
const DEFAULT_BASE_URL = 'https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24;

export const EXERCISE_DB_V2_DEFAULT_CONFIG = {
	apiKey: process.env.EXPO_PUBLIC_EXERCISEDB_API_KEY ?? '',
	host:
		process.env.EXPO_PUBLIC_EXERCISEDB_HOST ??
		'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com',
	baseUrl: process.env.EXPO_PUBLIC_EXERCISEDB_BASE_URL ?? DEFAULT_BASE_URL,
};

const LOCAL_SEARCH_FALLBACKS = [
	{
		id: 'local-push-up',
		name: 'Push Up',
		imageUrl:
			'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=720&h=720&fit=crop&q=80',
		videoUrl: null,
		instructions: ['Mantén el cuerpo alineado y desciende con control antes de empujar hacia arriba.'],
	},
	{
		id: 'local-squat',
		name: 'Bodyweight Squat',
		imageUrl:
			'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?w=720&h=720&fit=crop&q=80',
		videoUrl: null,
		instructions: ['Lleva la cadera hacia atrás, baja con pecho erguido y sube empujando desde los talones.'],
	},
	{
		id: 'local-lunge',
		name: 'Walking Lunge',
		imageUrl:
			'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=720&h=720&fit=crop&q=80',
		videoUrl: null,
		instructions: ['Da un paso largo, baja ambas rodillas con control y alterna piernas al avanzar.'],
	},
	{
		id: 'local-plank',
		name: 'Plank',
		imageUrl:
			'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=720&h=720&fit=crop&q=80',
		videoUrl: null,
		instructions: ['Aprieta abdomen y glúteos para mantener una línea recta del cuello a los tobillos.'],
	},
];

let isCacheHydrated = false;
let cacheHydrationPromise = null;

function normalizeText(value) {
	return String(value ?? '')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, ' ');
}

function normalizeUrl(value) {
	const url = String(value ?? '').trim();
	if (!url) {
		return null;
	}

	if (/^http:\/\//i.test(url)) {
		return url.replace(/^http:\/\//i, 'https://');
	}

	return url;
}

function ensureArray(value) {
	return Array.isArray(value) ? value : [];
}

function pickFirstNonEmpty(values) {
	for (const value of values) {
		if (value === undefined || value === null) {
			continue;
		}

		const normalized = String(value).trim();
		if (normalized) {
			return normalized;
		}
	}

	return '';
}

function buildCacheKey(query) {
	return `query:${normalizeText(query)}`;
}

function normalizeInstructions(exercise) {
	const instructions = ensureArray(exercise?.instructions)
		.map((step) => String(step ?? '').trim())
		.filter(Boolean);

	if (instructions.length) {
		return instructions;
	}

	const overview = String(exercise?.overview ?? '').trim();
	return overview ? [overview] : [];
}

function normalizeExercise(exercise) {
	if (!exercise || typeof exercise !== 'object') {
		return null;
	}

	const id = pickFirstNonEmpty([exercise.exerciseId, exercise.id]);
	const name = pickFirstNonEmpty([exercise.name]);

	if (!id || !name) {
		return null;
	}

	const imageUrl = normalizeUrl(
		exercise.imageUrl ??
			exercise.imageUrls?.['720p'] ??
			exercise.imageUrls?.['480p'] ??
			exercise.imageUrls?.['360p']
	);
	const videoUrl = normalizeUrl(exercise.videoUrl);

	return {
		id,
		name,
		imageUrl,
		videoUrl,
		instructions: normalizeInstructions(exercise),
		bodyParts: ensureArray(exercise.bodyParts).map((item) => String(item)),
		targetMuscles: ensureArray(exercise.targetMuscles).map((item) => String(item)),
		equipments: ensureArray(exercise.equipments).map((item) => String(item)),
		overview: String(exercise.overview ?? '').trim(),
	};
}

function normalizeSearchPayload(payload) {
	const rawExercises = Array.isArray(payload)
		? payload
		: Array.isArray(payload?.results)
			? payload.results
			: Array.isArray(payload?.data)
				? payload.data
				: Array.isArray(payload?.exercises)
					? payload.exercises
					: [];

	const results = [];
	const seenIds = new Set();

	rawExercises.forEach((exercise) => {
		const normalizedExercise = normalizeExercise(exercise);
		if (!normalizedExercise) {
			return;
		}

		if (seenIds.has(normalizedExercise.id)) {
			return;
		}

		seenIds.add(normalizedExercise.id);
		results.push(normalizedExercise);
	});

	return results;
}

function searchLocalFallbackExercises(query) {
	const normalizedQuery = normalizeText(query);
	if (!normalizedQuery) {
		return LOCAL_SEARCH_FALLBACKS;
	}

	return LOCAL_SEARCH_FALLBACKS.filter((exercise) =>
		normalizeText(exercise.name).includes(normalizedQuery)
	);
}

function createApiError(message, details = {}) {
	const error = new Error(message);
	error.details = details;
	return error;
}

function isExpired(savedAtIsoString) {
	if (!savedAtIsoString) {
		return true;
	}

	const savedAtTime = new Date(savedAtIsoString).getTime();
	if (!Number.isFinite(savedAtTime)) {
		return true;
	}

	return Date.now() - savedAtTime > CACHE_TTL_MS;
}

async function hydrateCache() {
	if (isCacheHydrated) {
		return;
	}

	if (!cacheHydrationPromise) {
		cacheHydrationPromise = AsyncStorage.getItem(EXERCISE_QUERY_CACHE_STORAGE_KEY)
			.then((rawValue) => {
				if (!rawValue) {
					return;
				}

				const parsedValue = JSON.parse(rawValue);

				Object.entries(parsedValue ?? {}).forEach(([cacheKey, cacheValue]) => {
					if (!cacheValue || !Array.isArray(cacheValue.value)) {
						return;
					}

					if (isExpired(cacheValue.savedAt)) {
						return;
					}

					SESSION_QUERY_CACHE.set(cacheKey, cacheValue);
				});
			})
			.catch(() => {
				SESSION_QUERY_CACHE.clear();
			})
			.finally(() => {
				isCacheHydrated = true;
				cacheHydrationPromise = null;
			});
	}

	await cacheHydrationPromise;
}

async function persistCache() {
	const payload = Object.fromEntries(SESSION_QUERY_CACHE.entries());
	await AsyncStorage.setItem(EXERCISE_QUERY_CACHE_STORAGE_KEY, JSON.stringify(payload));
}

function getCachedSearch(cacheKey) {
	const cacheEntry = SESSION_QUERY_CACHE.get(cacheKey);
	if (!cacheEntry || isExpired(cacheEntry.savedAt)) {
		SESSION_QUERY_CACHE.delete(cacheKey);
		return null;
	}

	return cacheEntry.value;
}

async function setCachedSearch(cacheKey, value) {
	SESSION_QUERY_CACHE.set(cacheKey, {
		savedAt: new Date().toISOString(),
		value,
	});

	await persistCache();
}

function createSearchCandidates(query) {
	const encodedQuery = encodeURIComponent(query);
    
	return [
		`exercises/search?query=${encodedQuery}`,
		`exercises?query=${encodedQuery}`,
		`exercises/name/${encodedQuery}`,
		`exercises/search/${encodedQuery}`,
	];
}

async function parseErrorResponse(response) {
	try {
		const text = await response.text();
		return text ? text.slice(0, 300) : '';
	} catch {
		return '';
	}
}

export class ExerciseDBV2Client {
	constructor({ apiKey, host, baseUrl = DEFAULT_BASE_URL } = {}) {
		this.apiKey = apiKey ?? '';
		this.host = host ?? EXERCISE_DB_V2_DEFAULT_CONFIG.host;
		this.baseUrl = String(baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
	}

	isConfigured() {
		return Boolean(this.apiKey && this.host);
	}

	async searchExercises(query) {
		const normalizedQuery = normalizeText(query);
		if (!normalizedQuery) {
			return [];
		}

		await hydrateCache();

		const cacheKey = buildCacheKey(normalizedQuery);
		const cachedResult = getCachedSearch(cacheKey);
		if (cachedResult) {
			return cachedResult;
		}

		let results = [];

		try {
			results = await this._searchFromNetwork(normalizedQuery);
		} catch (error) {
			console.warn('[ExerciseDBV2] network search failed, using local fallback', {
				query: normalizedQuery,
				error: String(error),
			});
		}

		if (!results.length) {
			results = searchLocalFallbackExercises(normalizedQuery);
		}

		await setCachedSearch(cacheKey, results);
		return results;
	}

	async _searchFromNetwork(query) {
		if (!this.isConfigured()) {
			throw createApiError('ExerciseDB V2 credentials are missing.', { type: 'credentials' });
		}

		const candidates = createSearchCandidates(query);
		let lastHttpError = null;

		for (const endpoint of candidates) {
			const fullUrl = `${this.baseUrl}/${endpoint}`;

			let response;
			try {
				response = await fetch(fullUrl, {
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': this.apiKey,
						'X-RapidAPI-Host': this.host,
					},
				});
			} catch (networkError) {
				lastHttpError = createApiError('ExerciseDB V2 request failed.', {
					type: 'network',
					fullUrl,
					error: String(networkError),
				});
				continue;
			}

			if (!response.ok) {
				const errorBody = await parseErrorResponse(response);
				lastHttpError = createApiError(
					`ExerciseDB V2 returned ${response.status}${errorBody ? `: ${errorBody}` : ''}`,
					{ type: 'http', endpoint, status: response.status, fullUrl }
				);

				if (response.status >= 500 || response.status === 404 || response.status === 400) {
					continue;
				}

				throw lastHttpError;
			}

			const payload = await response.json();
			const normalizedResults = normalizeSearchPayload(payload);
			if (normalizedResults.length) {
				return normalizedResults;
			}
		}

		if (lastHttpError) {
			throw lastHttpError;
		}

		return [];
	}
}

export function createExerciseDBV2Client(config = {}) {
	return new ExerciseDBV2Client({ ...EXERCISE_DB_V2_DEFAULT_CONFIG, ...config });
}

export async function searchExercises(query, config = {}) {
	const client = createExerciseDBV2Client(config);
	return client.searchExercises(query);
}

export async function clearExerciseCache() {
	SESSION_QUERY_CACHE.clear();
	isCacheHydrated = false;
	cacheHydrationPromise = null;
	await AsyncStorage.removeItem(EXERCISE_QUERY_CACHE_STORAGE_KEY);
}

export default {
	ExerciseDBV2Client,
	createExerciseDBV2Client,
	searchExercises,
	clearExerciseCache,
};
