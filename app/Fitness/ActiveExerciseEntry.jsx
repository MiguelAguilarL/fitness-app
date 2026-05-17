import React, { useEffect, useState } from 'react'
import { StatusBar, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutCard from '../../components/Home/WorkoutCard'
import { loadAllRoutines } from '../../utils/routinesStorage'

export default function ActiveExerciseEntry() {
  const navigation = useNavigation()
  const [routineId, setRoutineId] = useState(null)

  useEffect(() => {
    let mounted = true

    const loadDefaultRoutine = async () => {
      try {
        const routines = await loadAllRoutines()
        if (!mounted) {
          return
        }

        const firstRoutine = Array.isArray(routines) && routines.length > 0 ? routines[0] : null
        setRoutineId(firstRoutine?.id ?? null)
      } catch (error) {
        console.error('Error loading default routine for ActiveExerciseEntry:', error)
        if (mounted) {
          setRoutineId(null)
        }
      }
    }

    loadDefaultRoutine()

    return () => {
      mounted = false
    }
  }, [])

  const handleOpenRoutine = () => {
    if (!routineId) {
      navigation.navigate('FitnessHome')
      return
    }

    navigation.navigate('RoutineDetail', { routineId })
  }

  const handleStartSession = () => {
    if (!routineId) {
      navigation.navigate('FitnessHome')
      return
    }

    navigation.navigate('ActiveExerciseSession', { routineId })
  }

  return (
    <SafeAreaView edges={['top','bottom']} className="flex-1 bg-[#07060a]">
      <StatusBar barStyle="light-content" backgroundColor="#07060a" />

      <View className="px-4 pt-6">
        <Text className="text-[#d6a6ff] text-[26px] font-extrabold">Sesión de hoy</Text>
        <View className="h-3" />

        {routineId ? (
          <WorkoutCard onCardPress={handleOpenRoutine} onStartPress={handleStartSession} />
        ) : (
          <View className="rounded-[18px] border border-white/8 bg-[#0f1220] p-4">
            <Text className="text-white font-semibold text-base">No tienes rutinas aún</Text>
            <Text className="text-[#a9a9b8] mt-2">Crea una rutina para iniciar tu sesión activa.</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('FitnessHome')}
              className="mt-4 rounded-full border border-[#d6a6ff]/30 bg-[#d6a6ff]/10 py-2.5"
            >
              <Text className="text-center text-[#d6a6ff] font-semibold">Ir a Rutinas</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
