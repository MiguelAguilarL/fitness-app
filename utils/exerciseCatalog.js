const RAW_EXERCISES = require('../exercises.json')

const EXERCISE_LIMIT = 30

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

function normalizeTags(values) {
	return ensureArray(values)
		.map((value) => String(value ?? '').trim())
		.filter(Boolean)
}

function normalizeExercise(exercise, index) {
	if (!exercise || typeof exercise !== 'object') {
		return null
	}

	const title = pickFirstNonEmpty([exercise.title, exercise.name])
	if (!title) {
		return null
	}

	const id = pickFirstNonEmpty([exercise.id, exercise.id_num, exercise.name, title]) || `exercise-${index + 1}`
	const overview = pickFirstNonEmpty([exercise.primer, exercise.overview, exercise.description])
	const imageUrl = normalizeUrl(
		ensureArray(exercise.images)[0] ??
			exercise.imageUrl ??
			ensureArray(exercise.img)[0] ??
			null
	)
	const steps = ensureArray(exercise.steps)
		.map((step) => String(step ?? '').trim())
		.filter(Boolean)
	const tips = ensureArray(exercise.tips)
		.map((tip) => String(tip ?? '').trim())
		.filter(Boolean)

	return {
		id,
		name: title,
		title,
		imageUrl,
		videoUrl: normalizeUrl(exercise.videoUrl),
		instructions: steps.length ? steps : overview ? [overview] : tips,
		bodyParts: normalizeTags([exercise.primary, ...ensureArray(exercise.secondary)]),
		targetMuscles: normalizeTags([exercise.primary, ...ensureArray(exercise.secondary)]),
		equipments: normalizeTags(exercise.equipment),
		overview,
		sourceUrl: String(exercise.url ?? '').trim() || null,
	}
}

function buildSearchableValues(exercise) {
	return [
		exercise.name,
		exercise.title,
		exercise.overview,
		exercise.sourceUrl,
		...(Array.isArray(exercise.bodyParts) ? exercise.bodyParts : []),
		...(Array.isArray(exercise.targetMuscles) ? exercise.targetMuscles : []),
		...(Array.isArray(exercise.equipments) ? exercise.equipments : []),
		...(Array.isArray(exercise.instructions) ? exercise.instructions : []),
	]
}

export const EXERCISE_CATALOG = ensureArray(RAW_EXERCISES)
	.map((exercise, index) => normalizeExercise(exercise, index))
	.filter(Boolean)

export function getFeaturedExercises(limit = EXERCISE_LIMIT) {
	return EXERCISE_CATALOG.slice(0, Math.max(0, limit))
}

export function searchExerciseCatalog(query, limit = EXERCISE_LIMIT) {
	const normalizedQuery = normalizeText(query)
	if (!normalizedQuery) {
		return getFeaturedExercises(limit)
	}

	return EXERCISE_CATALOG.filter((exercise) =>
		buildSearchableValues(exercise).some((value) => normalizeText(value).includes(normalizedQuery))
	).slice(0, Math.max(0, limit))
}