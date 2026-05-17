import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, Pressable, RefreshControl } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PrimaryButton from '../../components/PrimaryButton'
import { loadAllRoutines, loadUserRoutines } from '../../utils/routinesStorage'

export default function RoutinesScreen({ navigation }) {
  const [allRoutines, setAllRoutines] = useState([])
  const [userRoutines, setUserRoutines] = useState([])
  const [loading, setLoading] = useState(true)

  // Cargar rutinas cuando la pantalla recibe foco
  useFocusEffect(
    useCallback(() => {
      loadRoutines()
    }, []),
  )

  const loadRoutines = async () => {
    setLoading(true)
    try {
      const all = await loadAllRoutines()
      const user = await loadUserRoutines()
      setAllRoutines(all)
      setUserRoutines(user)
    } catch (error) {
      console.error('Error loading routines:', error)
    } finally {
      setLoading(false)
    }
  }

  const predefinedRoutines = allRoutines.filter((r) => r.isPredefined)

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      {/* Header */}
      <View className="px-4 pt-6 pb-4">
        <Text className="text-2xl font-bold text-white">Mis Rutinas</Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadRoutines} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Botón Crear Rutina */}
        <View className="mb-6">
          <PrimaryButton
            label="+ Crear Nueva Rutina"
            onPress={() => navigation.navigate('CreateRoutine')}
          />
        </View>

        {/* Sección: Rutinas del Usuario */}
        {userRoutines.length > 0 && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-white mb-3">
              Mis Rutinas Personalizadas
            </Text>
            <View className="gap-3">
              {userRoutines.map((routine) => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  onPress={() => navigation.navigate('RoutineDetail', { routineId: routine.id })}
                />
              ))}
            </View>
          </View>
        )}

        {/* Sección: Rutinas Predefinidas */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-white mb-3">
            Rutinas Disponibles
          </Text>
          <View className="gap-3">
            {predefinedRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onPress={() => navigation.navigate('RoutineDetail', { routineId: routine.id })}
                showBadge
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

/**
 * Componente Card para mostrar una rutina
 */
function RoutineCard({ routine, onPress, showBadge = false }) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-[18px] border border-white/6 bg-[#0f1220] p-4 active:opacity-70"
    >
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1">
          <Text className="text-base font-semibold text-white">{routine.title}</Text>
          <Text className="text-xs text-[#b9a9cc] mt-1">{routine.description}</Text>
        </View>
        {showBadge && (
          <View className="bg-[#d6a6ff]/20 px-3 py-1 rounded-full ml-2">
            <Text className="text-xs font-semibold text-[#d6a6ff]">Popular</Text>
          </View>
        )}
      </View>

      <View className="flex-row gap-4 mt-3 pt-3 border-t border-white/5">
        <View>
          <Text className="text-xs text-[#a9a9b8]">Duración</Text>
          <Text className="text-sm font-semibold text-white">{routine.duration} min</Text>
        </View>
        <View>
          <Text className="text-xs text-[#a9a9b8]">Ejercicios</Text>
          <Text className="text-sm font-semibold text-white">{routine.exercises.length}</Text>
        </View>
        <View>
          <Text className="text-xs text-[#a9a9b8]">Dificultad</Text>
          <Text className="text-sm font-semibold text-white capitalize">
            {routine.difficulty}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
