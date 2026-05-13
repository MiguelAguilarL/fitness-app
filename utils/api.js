import AsyncStorage from '@react-native-async-storage/async-storage';

const EXERCISE_CACHE_STORAGE_KEY = '@fitness-app:exercise-db-cache:v3';
const SESSION_CACHE = new Map();
const EXERCISEDB_RESOURCE_PREFIX = 'exercises';
export const EXERCISE_DB_DEFAULT_CONFIG = {
	apiKey: 'b24e3673aemsh601449b1e3e9a3ep168b12jsn89b7ee24e522',
	host: 'exercisedb.p.rapidapi.com',
};
const KNOWN_TARGET_ALIASES = {
	back: ['espalda', 'back', 'lumbar', 'dorsal'],
	chest: ['pecho', 'chest', 'pectoral'],
	shoulders: ['hombros', 'shoulders', 'deltoides'],
	legs: ['piernas', 'legs', 'cuadriceps', 'muslos'],
	biceps: ['biceps', 'bíceps'],
	triceps: ['triceps', 'tríceps'],
	abs: ['abdominales', 'abs', 'core', 'abdomen'],
	glutes: ['gluteos', 'glúteos', 'glutes', 'nalgas'],
	calves: ['pantorrillas', 'calves', 'gemelos'],
	forearms: ['antebrazos', 'forearms'],
	lats: ['dorsales', 'lats'],
	traps: ['trapecios', 'traps'],
	hamstrings: ['isquiotibiales', 'hamstrings'],
};

const LOCAL_EXERCISE_FALLBACKS = [
	{
		id: 'fallback-push-up',
		name: 'Push Up',
		bodyPart: 'chest',
		target: 'pectorals',
		equipment: 'body weight',
		gifUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/push-up-exercise-illustration.gif',
	},
	{
		id: 'fallback-bodyweight-squat',
		name: 'Bodyweight Squat',
		bodyPart: 'upper legs',
		target: 'quadriceps',
		equipment: 'body weight',
		gifUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/bodyweight-squat-exercise-illustration.gif',
	},
	{
		id: 'fallback-plank',
		name: 'Plank',
		bodyPart: 'waist',
		target: 'abs',
		equipment: 'body weight',
		gifUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.gif',
	},
	{
		id: 'fallback-lunge',
		name: 'Walking Lunge',
		bodyPart: 'upper legs',
		target: 'glutes',
		equipment: 'body weight',
		gifUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/lunge-exercise-illustration.gif',
	},
	{
		id: 'fallback-jumping-jacks',
		name: 'Jumping Jacks',
		bodyPart: 'cardio',
		target: 'cardio',
		equipment: 'body weight',
		gifUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif',
	},
	{
		id: 'fallback-crunch',
		name: 'Crunch',
		bodyPart: 'waist',
		target: 'abs',
		equipment: 'body weight',
		gifUrl: 'https://www.spotebi.com/wp-content/uploads/2014/10/crunches-exercise-illustration.gif',
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

function buildCacheKey(type, query) {
	return `${type}:${normalizeText(query)}`;
}

function safeArray(value) {
	return Array.isArray(value) ? value : [];
}

function normalizeGifUrl(urlValue) {
	const rawUrl = String(urlValue ?? '').trim();

	if (!rawUrl) {
		return null;
	}

	if (/^http:\/\//i.test(rawUrl)) {
		return rawUrl.replace(/^http:\/\//i, 'https://');
	}

	return rawUrl;
}

function normalizeHasGif(value) {
	if (typeof value === 'boolean') {
		return value;
	}

	const normalizedValue = String(value ?? '').trim().toLowerCase();
	return normalizedValue === 'true' || normalizedValue === '1' || normalizedValue === 'yes';
}

function normalizeExercise(exercise) {
	if (!exercise || typeof exercise !== 'object') {
		return null;
	}

	const gifUrl = normalizeGifUrl(exercise.gifUrl);
	const hasGif = normalizeHasGif(exercise.hasGif) || Boolean(gifUrl);

	return {
		...exercise,
		hasGif,
		gifUrl,
	};
}

function normalizeExercisesPayload(payload) {
	const rawExercises = Array.isArray(payload)
		? payload
		: Array.isArray(payload?.data)
			? payload.data
			: Array.isArray(payload?.results)
				? payload.results
				: [];

	return rawExercises
		.map(normalizeExercise)
		.filter((exercise) => Boolean(exercise && (exercise.hasGif || exercise.gifUrl)));
}

function getLocalFallbackExercises() {
	return LOCAL_EXERCISE_FALLBACKS.map(normalizeExercise).filter(Boolean);
}

function searchLocalExercises(query) {
	const normalizedQuery = normalizeText(query);
	const exercises = getLocalFallbackExercises();

	if (!normalizedQuery) {
		return exercises;
	}

	return exercises.filter((exercise) => {
		return [exercise?.name, exercise?.bodyPart, exercise?.target, exercise?.equipment].some((field) =>
			normalizeText(field).includes(normalizedQuery)
		);
	});
}

function getLocalExercisesForTargets(targets) {
	const resolvedTargets = Array.from(new Set(targets.map(normalizeText).filter(Boolean)));

	if (!resolvedTargets.length) {
		return getLocalFallbackExercises();
	}

	const mergedExercises = [];
	const seenKeys = new Set();

	resolvedTargets.forEach((target) => {
		searchLocalExercises(target).forEach((exercise) => {
			const uniqueKey = String(exercise?.id ?? exercise?.name ?? '').toLowerCase();

			if (!uniqueKey || seenKeys.has(uniqueKey)) {
				return;
			}

			seenKeys.add(uniqueKey);
			mergedExercises.push(exercise);
		});
	});

	return mergedExercises.length ? mergedExercises : getLocalFallbackExercises();
}

function padWithLocalFallbackExercises(exercises, minimumCount = 5) {
	const mergedExercises = [];
	const seenKeys = new Set();

	[...safeArray(exercises), ...getLocalFallbackExercises()].forEach((exercise) => {
		const uniqueKey = String(exercise?.id ?? exercise?.name ?? '').toLowerCase();

		if (!uniqueKey || seenKeys.has(uniqueKey)) {
			return;
		}

		seenKeys.add(uniqueKey);
		mergedExercises.push(exercise);
	});

	return mergedExercises.slice(0, Math.max(minimumCount, mergedExercises.length));
}

function createExerciseDBError(message, details = {}) {
	const error = new Error(message);
	error.details = details;
	return error;
}

async function hydrateCache() {
	if (isCacheHydrated) {
		return;
	}

	if (!cacheHydrationPromise) {
		cacheHydrationPromise = AsyncStorage.getItem(EXERCISE_CACHE_STORAGE_KEY)
			.then((rawValue) => {
				if (!rawValue) {
					return;
				}

				const parsedValue = JSON.parse(rawValue);

				Object.entries(parsedValue ?? {}).forEach(([key, entry]) => {
					if (entry && Array.isArray(entry.value)) {
						SESSION_CACHE.set(key, entry);
					}
				});
			})
			.catch(() => {
				SESSION_CACHE.clear();
			})
			.finally(() => {
				isCacheHydrated = true;
				cacheHydrationPromise = null;
			});
	}

	await cacheHydrationPromise;
}

async function persistCache() {
	const payload = Object.fromEntries(SESSION_CACHE.entries());
	await AsyncStorage.setItem(EXERCISE_CACHE_STORAGE_KEY, JSON.stringify(payload));
}

function getCachedExercises(cacheKey) {
	const entry = SESSION_CACHE.get(cacheKey);
	return entry?.value ?? null;
}

async function setCachedExercises(cacheKey, value, meta = {}) {
	SESSION_CACHE.set(cacheKey, {
		value,
		meta: {
			savedAt: new Date().toISOString(),
			...meta,
		},
	});

	await persistCache();
}

function normalizeTarget(target) {
	const normalizedTarget = normalizeText(target);

	for (const [canonicalTarget, aliases] of Object.entries(KNOWN_TARGET_ALIASES)) {
		if (canonicalTarget === normalizedTarget || aliases.includes(normalizedTarget)) {
			return canonicalTarget;
		}
	}

	return normalizedTarget;
}

function inferTargetFromProfile(profile) {
	const recommendedSplit = normalizeText(profile?.recommendedSplit?.label ?? profile?.recommendedSplit ?? '');
	const goal = normalizeText(profile?.goal?.label ?? profile?.goal ?? '');
	const focusArea = normalizeText(profile?.focusArea?.label ?? profile?.focusArea ?? '');

	if (recommendedSplit.includes('push/pull/legs') || recommendedSplit.includes('upper/lower')) {
		return focusArea.includes('upper') ? ['push', 'pull', 'back'] : ['legs', 'squat', 'lunge'];
	}

	if (recommendedSplit.includes('full body') || focusArea.includes('full')) {
		return ['compound', 'barbell', 'dumbbell'];
	}

	if (goal.includes('gana') || goal.includes('muscle')) {
		return focusArea.includes('upper') ? ['chest', 'back', 'pull'] : ['legs', 'squat', 'deadlift'];
	}

	if (goal.includes('grasa') || goal.includes('fat')) {
		return ['cardio', 'burpee', 'jump'];
	}

	return focusArea.includes('lower') ? ['legs', 'squat'] : ['push', 'pull'];
}

async function fetchUniqueExercises(client, targets) {
	const resolvedTargets = Array.from(new Set(targets.filter(Boolean)));
	const settledResults = await Promise.allSettled(
		resolvedTargets.map((target) => client.getExercisesByName(target))
	);

	const mergedExercises = [];
	const seenKeys = new Set();

	settledResults.forEach((result) => {
		if (result.status !== 'fulfilled') {
			return;
		}

		safeArray(result.value).forEach((exercise) => {
			const uniqueKey = String(exercise?.id ?? exercise?.name ?? '').toLowerCase();

			if (!uniqueKey || seenKeys.has(uniqueKey)) {
				return;
			}

			seenKeys.add(uniqueKey);
			mergedExercises.push(exercise);
		});
	});

	return mergedExercises;
}

export class ExerciseDBClient {
	constructor({ apiKey, host, baseUrl = 'https://exercisedb.p.rapidapi.com' } = {}) {
		this.apiKey = apiKey ?? '';
		this.host = host ?? 'exercisedb.p.rapidapi.com';
		this.baseUrl = String(baseUrl).replace(/\/$/, '');
	}

	isConfigured() {
		return Boolean(this.apiKey && this.host);
	}

	async getExercisesByTarget(target) {
		return this._getExercises('target', target);
	}

	async getExercisesByName(name) {
		return this._getExercises('name', name);
	}

	async getExercisesByEquipment(equipment) {
		return this._getExercises('equipment', equipment);
	}

	async getRecommendedExercises(profile) {
		const targets = inferTargetFromProfile(profile);
		const cacheKey = buildCacheKey('profile', `${profile?.recommendedSplit?.label ?? profile?.recommendedSplit ?? ''}-${profile?.goal?.label ?? profile?.goal ?? ''}-${profile?.focusArea?.label ?? profile?.focusArea ?? ''}`);

		await hydrateCache();

		const cachedExercises = getCachedExercises(cacheKey);
		if (cachedExercises) {
			return cachedExercises;
		}

		let exercises = [];

		try {
			exercises = await fetchUniqueExercises(this, targets);
		} catch (error) {
			console.warn('[ExerciseDB] falling back to local recommended exercises', { error: String(error) });
		}

		if (!exercises.length) {
			exercises = getLocalExercisesForTargets(targets);
		}

		exercises = padWithLocalFallbackExercises(exercises, 5);

		await setCachedExercises(cacheKey, exercises, { type: 'profile', targets });

		return exercises;
	}

	async searchExercises(query) {
		const normalizedQuery = normalizeText(query);
		if (!normalizedQuery) {
			return getLocalFallbackExercises();
		}

		await hydrateCache();

		const cacheKey = buildCacheKey('name', normalizedQuery);

		const cachedExercises = getCachedExercises(cacheKey);
		if (cachedExercises) {
			return cachedExercises;
		}

		let exercises = [];

		try {
			exercises = await this.getExercisesByName(normalizedQuery);
		} catch (error) {
			console.warn('[ExerciseDB] falling back to local search results', { error: String(error), query: normalizedQuery });
		}

		if (!exercises.length) {
			exercises = searchLocalExercises(normalizedQuery);
		}

		await setCachedExercises(cacheKey, exercises, { type: 'name', query: normalizedQuery });

		return exercises;
	}

	async _getExercises(type, value) {
		const normalizedValue = normalizeText(value);

		if (!normalizedValue) {
			return getLocalFallbackExercises();
		}

		const cacheKey = buildCacheKey(type, normalizedValue);

		await hydrateCache();

		const cachedExercises = getCachedExercises(cacheKey);
		if (cachedExercises) {
			return cachedExercises;
		}

		const pathValue = encodeURIComponent(type === 'target' ? normalizeTarget(normalizedValue) : normalizedValue);
		let exercises = [];

		try {
			exercises = await this._makeRequest(`${EXERCISEDB_RESOURCE_PREFIX}/${type}/${pathValue}`);
		} catch (error) {
			console.warn('[ExerciseDB] falling back to local exercises', { error: String(error), type, value: normalizedValue });
		}

		if (!exercises.length) {
			exercises = searchLocalExercises(normalizedValue);
		}

		await setCachedExercises(cacheKey, exercises, { type, query: normalizedValue });

		return exercises;
	}

	async _makeRequest(endpoint) {
		if (!this.isConfigured()) {
			throw createExerciseDBError('ExerciseDB credentials are missing. Add apiKey and host before using the client.', {
				type: 'credentials',
			});
		}

		let response;

		const fullUrl = `${this.baseUrl}/${endpoint}`;

		try {
			response = await fetch(fullUrl, {
				method: 'GET',
				headers: {
					'x-rapidapi-host': this.host,
					'x-rapidapi-key': this.apiKey,
				},
			});
		} catch (fetchError) {
			console.error('[ExerciseDB] network error', { fullUrl, error: String(fetchError) });
			throw createExerciseDBError(`ExerciseDB request failed: ${fetchError.message}`, {
				type: 'network',
				endpoint,
				fullUrl,
			});
		}

		if (!response.ok) {
			let errorBody = '';

			try {
				errorBody = await response.text();
			} catch {
				errorBody = '';
			}

			console.error('[ExerciseDB] http error', { fullUrl, status: response.status, body: errorBody });

			const statusLabel =
				response.status === 401 || response.status === 403
					? 'credentials are invalid or unauthorized'
					: response.status === 429
						? 'rate limit reached'
						: response.status === 400
							? 'bad request (400) - payload or parameters invalid'
							: 'request failed';

			throw createExerciseDBError(
				`ExerciseDB failed (status ${response.status}): ${errorBody || statusLabel}`,
				{
					type: 'http',
					status: response.status,
					endpoint,
					fullUrl,
					body: errorBody || null,
				}
			);
		}

		try {
			const payload = await response.json();
			const exercises = normalizeExercisesPayload(payload);

			if (!exercises.length) {
				console.warn('[ExerciseDB] no exercises parsed from payload', {
					endpoint,
					payloadType: Array.isArray(payload) ? 'array' : typeof payload,
				});
			}

			return exercises;
		} catch (parseError) {
			throw createExerciseDBError(`ExerciseDB response could not be parsed: ${parseError.message}`, {
				type: 'parse',
				endpoint,
			});
		}
	}
}

export function createExerciseDBClient(config = {}) {
	return new ExerciseDBClient(config);
}

export async function getExercisesForUserProfile(profile, config = {}) {
	const client = new ExerciseDBClient(config);
	return client.getRecommendedExercises(profile);
}

export async function searchExercises(query, config = {}) {
	const client = new ExerciseDBClient(config);
	return client.searchExercises(query);
}

export async function clearExerciseCache() {
	SESSION_CACHE.clear();
	isCacheHydrated = false;
	cacheHydrationPromise = null;
	await AsyncStorage.removeItem(EXERCISE_CACHE_STORAGE_KEY);
}

export default {
	ExerciseDBClient,
	createExerciseDBClient,
	getExercisesForUserProfile,
	searchExercises,
	clearExerciseCache,
};
