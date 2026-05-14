import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import PrimaryButton from '../../components/PrimaryButton'
import { getRoutineById, deleteRoutine } from '../../utils/routinesStorage'

export default function RoutineDetailScreen({ route, navigation }) {
  const { routineId } = route.params
  const [routine, setRoutine] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRoutine()
  }, [])

  const loadRoutine = async () => {
    try {
      const r = await getRoutineById(routineId)
      setRoutine(r)
    } catch (error) {
      console.error('Error loading routine:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (routine.isPredefined) {
      return
    }

    try {
      await deleteRoutine(routineId)
      navigation.goBack()
    } catch (error) {
      console.error('Error deleting routine:', error)
    }
  }

  const handleStartRoutine = () => {
    // TODO: Navegar a pantalla de entrenamiento con esta rutina
    navigation.navigate('ActiveExercise')
  }

  if (loading || !routine) {
    return (
      <View className="flex-1 bg-[#07060a] items-center justify-center">
        <Text className="text-white">Cargando rutina...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-6 pb-4 border-b border-white/6">
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-bold text-white">Detalles</Text>
        {!routine.isPredefined && (
          <Pressable onPress={handleDelete}>
            <Feather name="trash-2" size={20} color="#ff6b6b" />
          </Pressable>
        )}
        {routine.isPredefined && <View style={{ width: 24 }} />}
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Información Principal */}
        <View className="mt-6 mb-6 rounded-[18px] bg-[#0f1220] border border-white/6 p-5">
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white mb-2">{routine.title}</Text>
              <Text className="text-sm text-[#b9a9cc]">{routine.description}</Text>
            </View>
            {routine.isPredefined && (
              <View className="bg-[#d6a6ff]/20 px-3 py-1 rounded-full">
                <Text className="text-xs font-semibold text-[#d6a6ff]">Popular</Text>
              </View>
            )}
          </View>

          <View className="flex-row gap-4 mt-4 pt-4 border-t border-white/5">
            <View className="flex-1">
              <Text className="text-xs text-[#a9a9b8] mb-1">Duración</Text>
              <Text className="text-base font-semibold text-white">{routine.duration} min</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-[#a9a9b8] mb-1">Dificultad</Text>
              <Text className="text-base font-semibold text-white capitalize">
                {routine.difficulty}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-[#a9a9b8] mb-1">Ejercicios</Text>
              <Text className="text-base font-semibold text-white">{routine.exercises.length}</Text>
            </View>
          </View>
        </View>

        {/* Ejercicios */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-white mb-3">Ejercicios</Text>
          <View className="gap-3">
            {routine.exercises.map((exercise, index) => (
              <View
                key={`${exercise.name}-${index}`}
                className="rounded-[14px] bg-[#0f1220] border border-white/6 p-4"
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-full bg-[#d6a6ff]/20 items-center justify-center">
                    <Text className="text-xs font-bold text-[#d6a6ff]">{index + 1}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-white">{exercise.name}</Text>
                    <Text className="text-sm text-[#b9a9cc] mt-1">
                      {exercise.sets} series × {exercise.reps} reps
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Botón Iniciar Rutina */}
        <View className="mb-8">
          <PrimaryButton label="Iniciar Rutina" onPress={handleStartRoutine} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
