import { getFeaturedExercises as getFeaturedExercisesFromCatalog, searchExerciseCatalog } from './exerciseCatalog'

const DEFAULT_BASE_URL = 'https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com'
const DEFAULT_HOST = 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com'

export const EXERCISE_DB_V2_DEFAULT_CONFIG = {
	apiKey: process.env.EXPO_PUBLIC_EXERCISEDB_API_KEY ?? '',
	host: process.env.EXPO_PUBLIC_EXERCISEDB_HOST ?? DEFAULT_HOST,
	baseUrl: process.env.EXPO_PUBLIC_EXERCISEDB_BASE_URL ?? DEFAULT_BASE_URL,
	limit: 30,
}

function normalizeText(value) {
	return String(value ?? '')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, ' ')
}

function normalizeUrl(value) {
	const url = String(value ?? '').trim()
	if (!url) {
		return null
	}

	if (/^http:\/\//i.test(url)) {
		return url.replace(/^http:\/\//i, 'https://')
	}

	return url
}

function ensureArray(value) {
	return Array.isArray(value) ? value : []
}

function pickFirstNonEmpty(values) {
	for (const value of values) {
		if (value === undefined || value === null) {
			continue
		}

		const normalized = String(value).trim()
		if (normalized) {
			return normalized
		}
	}

	return ''
}

function createApiError(message, details = {}) {
	const error = new Error(message)
	error.details = details
	return error
}

function normalizeExercise(exercise) {
	if (!exercise || typeof exercise !== 'object') {
		return null
	}

	const id = pickFirstNonEmpty([exercise.exerciseId, exercise.id])
	const name = pickFirstNonEmpty([exercise.name, exercise.title])
	if (!id || !name) {
		return null
	}

	const imageUrl = normalizeUrl(
		exercise.imageUrl ??
			exercise.imageUrls?.['720p'] ??
			exercise.imageUrls?.['480p'] ??
			exercise.imageUrls?.['360p'] ??
			exercise.images?.[0]
	)

	return {
		id,
		name,
		title: name,
		imageUrl,
		videoUrl: normalizeUrl(exercise.videoUrl),
		instructions: ensureArray(exercise.instructions)
			.map((step) => String(step ?? '').trim())
			.filter(Boolean),
		bodyParts: ensureArray(exercise.bodyParts).map((item) => String(item)),
		targetMuscles: ensureArray(exercise.targetMuscles).map((item) => String(item)),
		secondaryMuscles: ensureArray(exercise.secondaryMuscles).map((item) => String(item)),
		equipments: ensureArray(exercise.equipments).map((item) => String(item)),
		overview: String(exercise.overview ?? '').trim(),
		keywords: ensureArray(exercise.keywords).map((item) => String(item)),
		exerciseType: String(exercise.exerciseType ?? '').trim(),
	}
}

async function parseErrorResponse(response) {
	try {
		const text = await response.text()
		return text ? text.slice(0, 300) : ''
	} catch {
		return ''
	}
}

async function fetchJson(fullUrl, headers) {
	let response
	try {
		response = await fetch(fullUrl, {
			method: 'GET',
			headers,
		})
	} catch (networkError) {
		throw createApiError('ExerciseDB V2 request failed.', {
			type: 'network',
			fullUrl,
			error: String(networkError),
		})
	}

	if (!response.ok) {
		const errorBody = await parseErrorResponse(response)
		throw createApiError(`ExerciseDB V2 returned ${response.status}${errorBody ? `: ${errorBody}` : ''}`, {
			type: 'http',
			status: response.status,
			fullUrl,
		})
	}

	return response.json()
}

function buildSearchUrl(baseUrl, query) {
	const encodedQuery = encodeURIComponent(query)
	return `${String(baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '')}/api/v1/exercises/search?search=${encodedQuery}`
}

function buildExerciseUrl(baseUrl, exerciseId) {
	const encodedId = encodeURIComponent(exerciseId)
	return `${String(baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '')}/api/v1/exercises/${encodedId}`
}

function normalizeSearchResponse(payload) {
	const rawExercises = Array.isArray(payload)
		? payload
		: Array.isArray(payload?.data)
			? payload.data
			: Array.isArray(payload?.results)
				? payload.results
				: []

	return rawExercises.map((exercise) => normalizeExercise(exercise)).filter(Boolean)
}

export class ExerciseDBV2Client {
	constructor({ apiKey, host, baseUrl = DEFAULT_BASE_URL, limit = EXERCISE_DB_V2_DEFAULT_CONFIG.limit } = {}) {
		this.apiKey = apiKey ?? ''
		this.host = host ?? DEFAULT_HOST
		this.baseUrl = String(baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '')
		this.limit = limit
	}

	isConfigured() {
		return Boolean(this.apiKey && this.host)
	}

	async getFeaturedExercises() {
		if (!this.isConfigured()) {
			return []
		}

		try {
			// perform a broad search (common letter) and hydrate results, then filter out items
			const broadQuery = 'a'
			const searchPayload = await fetchJson(buildSearchUrl(this.baseUrl, broadQuery), {
				'X-RapidAPI-Key': this.apiKey,
				'X-RapidAPI-Host': this.host,
			})

			const raw = normalizeSearchResponse(searchPayload)
			const candidates = raw.slice(0, Math.max(this.limit, 50))

			const hydrated = await Promise.all(
				candidates.map(async (exercise) => {
					try {
						const detailPayload = await fetchJson(buildExerciseUrl(this.baseUrl, exercise.id), {
							'X-RapidAPI-Key': this.apiKey,
							'X-RapidAPI-Host': this.host,
						})

						const detailExercise = normalizeExercise(detailPayload?.data ?? detailPayload)
						return detailExercise ? { ...exercise, ...detailExercise } : exercise
					} catch (detailError) {
						return exercise
					}
				})
			)

			// filter out exercises without image/video and return up to 10
			return hydrated.filter((e) => e && (e.imageUrl || e.videoUrl)).slice(0, 10)
		} catch (error) {
			console.warn('[ExerciseDBV2] featured fetch failed', { error: String(error) })
			return []
		}
	}

	async searchExercises(query) {
		const normalizedQuery = normalizeText(query)
		if (!normalizedQuery) {
			return this.getFeaturedExercises()
		}

		if (!this.isConfigured()) {
			return searchExerciseCatalog(normalizedQuery, this.limit)
		}

		try {
			const searchPayload = await fetchJson(buildSearchUrl(this.baseUrl, normalizedQuery), {
				'X-RapidAPI-Key': this.apiKey,
				'X-RapidAPI-Host': this.host,
			})

			const searchResults = normalizeSearchResponse(searchPayload).slice(0, this.limit)
			if (!searchResults.length) {
				return searchExerciseCatalog(normalizedQuery, this.limit)
			}

			const hydratedResults = await Promise.all(
				searchResults.map(async (exercise) => {
					try {
						const detailPayload = await fetchJson(buildExerciseUrl(this.baseUrl, exercise.id), {
							'X-RapidAPI-Key': this.apiKey,
							'X-RapidAPI-Host': this.host,
						})

						const detailExercise = normalizeExercise(detailPayload?.data ?? detailPayload)
						return detailExercise ? { ...exercise, ...detailExercise } : exercise
					} catch (detailError) {
						console.warn('[ExerciseDBV2] detail hydration failed', {
							exerciseId: exercise.id,
							error: String(detailError),
						})
						return exercise
					}
				})
			)

			return hydratedResults.filter(Boolean)
		} catch (error) {
			console.warn('[ExerciseDBV2] network search failed, using local fallback', {
				query: normalizedQuery,
				error: String(error),
			})
			return searchExerciseCatalog(normalizedQuery, this.limit)
		}
	}
}

export function createExerciseDBV2Client(config = {}) {
	return new ExerciseDBV2Client({ ...EXERCISE_DB_V2_DEFAULT_CONFIG, ...config })
}

export async function searchExercises(query, config = {}) {
	const client = createExerciseDBV2Client(config)
	return client.searchExercises(query)
}

export async function getFeaturedExercises(limit = EXERCISE_DB_V2_DEFAULT_CONFIG.limit) {
	const client = createExerciseDBV2Client({ limit })
	return client.getFeaturedExercises()
}

export function getFeaturedExerciseList(limit = EXERCISE_DB_V2_DEFAULT_CONFIG.limit) {
	return getFeaturedExercisesFromCatalog(limit)
}

export default {
	ExerciseDBV2Client,
	createExerciseDBV2Client,
	searchExercises,
	getFeaturedExercises,
	getFeaturedExerciseList,
}
