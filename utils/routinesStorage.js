import AsyncStorage from '@react-native-async-storage/async-storage'

const ROUTINES_KEY = '@fitness-app:routines:v1'

// Rutinas predefinidas (escalable: reemplazar con API luego)
const PREDEFINED_ROUTINES = [
  {
    id: 'back-biceps',
    title: 'Espalda & Bíceps',
    description: 'Rutina de hipertrofia para espalda y brazos',
    difficulty: 'intermedio',
    duration: 45,
    exercises: [
      { name: 'Remo Sentado', sets: 3, reps: 10 },
      { name: 'Curl de Bíceps', sets: 3, reps: 10 },
    ],
    isPredefined: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'chest-triceps',
    title: 'Pecho & Tríceps',
    description: 'Rutina de hipertrofia para pecho y brazos',
    difficulty: 'intermedio',
    duration: 50,
    exercises: [
      { name: 'Press de Banca', sets: 4, reps: 8 },
      { name: 'Fondos', sets: 3, reps: 10 },
    ],
    isPredefined: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'legs',
    title: 'Piernas',
    description: 'Rutina completa para piernas',
    difficulty: 'avanzado',
    duration: 60,
    exercises: [
      { name: 'Sentadilla', sets: 4, reps: 8 },
      { name: 'Prensa de Piernas', sets: 3, reps: 10 },
      { name: 'Extensión de Cuádriceps', sets: 3, reps: 12 },
    ],
    isPredefined: true,
    createdAt: new Date().toISOString(),
  },
]

/**
 * Cargar todas las rutinas: predefinidas + guardadas del usuario
 */
export const loadAllRoutines = async () => {
  try {
    const saved = await AsyncStorage.getItem(ROUTINES_KEY)
    const userRoutines = saved ? JSON.parse(saved) : []
    return [...PREDEFINED_ROUTINES, ...userRoutines]
  } catch (error) {
    console.error('Error loading routines:', error)
    return PREDEFINED_ROUTINES
  }
}

/**
 * Cargar solo rutinas guardadas del usuario
 */
export const loadUserRoutines = async () => {
  try {
    const saved = await AsyncStorage.getItem(ROUTINES_KEY)
    return saved ? JSON.parse(saved) : []
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
    const newRoutines = [...userRoutines, routine]
    await AsyncStorage.setItem(ROUTINES_KEY, JSON.stringify(newRoutines))
    return routine
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
