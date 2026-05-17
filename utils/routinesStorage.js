import AsyncStorage from '@react-native-async-storage/async-storage'

const ROUTINES_KEY = '@fitness-app:routines:v1'

// Rutinas predefinidas (escalable: reemplazar con API luego)
const PREDEFINED_ROUTINES = [
  {
    id: 'fullbody-strength',
    title: 'Full Body Strength',
    description: 'Rutina de cuerpo completo enfocada en fuerza',
    difficulty: 'intermedio',
    duration: 40,
    exercises: [
      {
        id: 'exr_41n2hxnFMotsXTj3',
        name: 'Bench Press',
        imageUrl: 'https://cdn.exercisedb.dev/media/images/CNKJtB2O5Y.webp',
        videoUrl:
          'https://cdn.exercisedb.dev/videos/Trn4QDW/41n2hxnFMotsXTj3__Barbell-Bench-Press_Chest2_.mp4',
        instructions: [
          'Grip the barbell with your hands slightly wider than shoulder-width apart, palms facing your feet, and lift it off the rack, holding it straight over your chest with your arms fully extended.',
          'Slowly lower the barbell down to your chest while keeping your elbows at a 90-degree angle.',
          'Once the barbell touches your chest, push it back up to the starting position while keeping your back flat on the bench.',
          'Repeat this process for the desired number of repetitions, always maintaining control of the barbell and ensuring your form is correct.',
        ],
        sets: 4,
        reps: 8,
      },
      {
        id: 'local-squat',
        name: 'Bodyweight Squat',
        imageUrl: 'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?w=720&h=720&fit=crop&q=80',
        videoUrl: null,
        instructions: [
          'Lleva la cadera hacia atrás, baja con pecho erguido y sube empujando desde los talones.',
        ],
        sets: 3,
        reps: 12,
      },
    ],
    isPredefined: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'hypertrophy-upper',
    title: 'Upper Hypertrophy',
    description: 'Rutina para hipertrofia de tren superior',
    difficulty: 'intermedio',
    duration: 35,
    exercises: [
      {
        id: 'exr_41n2hxnFMotsXTj3',
        name: 'Bench Press',
        imageUrl: 'https://cdn.exercisedb.dev/media/images/CNKJtB2O5Y.webp',
        videoUrl:
          'https://cdn.exercisedb.dev/videos/Trn4QDW/41n2hxnFMotsXTj3__Barbell-Bench-Press_Chest2_.mp4',
        instructions: [
          'Grip the barbell with your hands slightly wider than shoulder-width apart and lower with control.',
          'Drive the bar up while keeping shoulder blades retracted.',
        ],
        sets: 4,
        reps: 10,
      },
      {
        id: 'local-plank',
        name: 'Plank',
        imageUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=720&h=720&fit=crop&q=80',
        videoUrl: null,
        instructions: ['Mantén el cuerpo alineado y aprieta el core por 30-60 segundos.'],
        sets: 3,
        reps: 1,
      },
    ],
    isPredefined: true,
    createdAt: new Date().toISOString(),
  },
]

const normalizeExercise = (exercise, index = 0) => {
  const normalizedName = String(exercise?.name ?? '').trim()
  const normalizedId = String(exercise?.id ?? normalizedName ?? '').trim() || `exercise-${index}`

  return {
    id: normalizedId,
    name: normalizedName || `Ejercicio ${index + 1}`,
    imageUrl: exercise?.imageUrl ?? null,
    videoUrl: exercise?.videoUrl ?? null,
    instructions: Array.isArray(exercise?.instructions) ? exercise.instructions : [],
    bodyParts: Array.isArray(exercise?.bodyParts) ? exercise.bodyParts : [],
    targetMuscles: Array.isArray(exercise?.targetMuscles) ? exercise.targetMuscles : [],
    secondaryMuscles: Array.isArray(exercise?.secondaryMuscles) ? exercise.secondaryMuscles : [],
    equipments: Array.isArray(exercise?.equipments) ? exercise.equipments : [],
    keywords: Array.isArray(exercise?.keywords) ? exercise.keywords : [],
    exerciseType: String(exercise?.exerciseType ?? '').trim(),
    overview: String(exercise?.overview ?? '').trim(),
    sourceUrl: String(exercise?.sourceUrl ?? '').trim() || null,
    sets: Number(exercise?.sets) || 3,
    reps: Number(exercise?.reps) || 10,
  }
}

const normalizeRoutine = (routine) => {
  const rawExercises = Array.isArray(routine?.exercises) ? routine.exercises : []

  return {
    ...routine,
    exercises: rawExercises.map((exercise, index) => normalizeExercise(exercise, index)),
  }
}

/**
 * Cargar todas las rutinas: predefinidas + guardadas del usuario
 */
export const loadAllRoutines = async () => {
  try {
    const saved = await AsyncStorage.getItem(ROUTINES_KEY)
    const userRoutines = saved ? JSON.parse(saved) : []
    return [...PREDEFINED_ROUTINES, ...userRoutines].map(normalizeRoutine)
  } catch (error) {
    console.error('Error loading routines:', error)
    return PREDEFINED_ROUTINES.map(normalizeRoutine)
  }
}

/**
 * Cargar solo rutinas guardadas del usuario
 */
export const loadUserRoutines = async () => {
  try {
    const saved = await AsyncStorage.getItem(ROUTINES_KEY)
    const routines = saved ? JSON.parse(saved) : []
    return routines.map(normalizeRoutine)
  } catch (error) {
    console.error('Error loading user routines:', error)
    return []
  }
}

/**
 * Guardar una nueva rutina del usuario
 */
export const saveRoutine = async (routine) => {
  try {
    const userRoutines = await loadUserRoutines()
    const newRoutines = [...userRoutines, normalizeRoutine(routine)]
    await AsyncStorage.setItem(ROUTINES_KEY, JSON.stringify(newRoutines))
    return normalizeRoutine(routine)
  } catch (error) {
    console.error('Error saving routine:', error)
    throw error
  }
}

/**
 * Eliminar rutina del usuario (no elimina predefinidas)
 */
export const deleteRoutine = async (routineId) => {
  try {
    const userRoutines = await loadUserRoutines()
    const filtered = userRoutines.filter((r) => r.id !== routineId)
    await AsyncStorage.setItem(ROUTINES_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting routine:', error)
    throw error
  }
}

/**
 * Obtener rutina por ID
 */
export const getRoutineById = async (routineId) => {
  try {
    const allRoutines = await loadAllRoutines()
    return allRoutines.find((r) => r.id === routineId)
  } catch (error) {
    console.error('Error getting routine:', error)
    return null
  }
}

/**
 * Generar ID único para nuevas rutinas
 */
export const generateRoutineId = () => {
  return `routine-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
