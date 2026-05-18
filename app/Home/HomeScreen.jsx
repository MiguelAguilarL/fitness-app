import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../../components/Home/HomeHeader'
import StreakRow from '../../components/Home/StreakRow'
import { loadAllRoutines } from '../../utils/routinesStorage'
import { loadUserProfile } from '../../utils/userProfileStorage'

export default function HomeScreen() {
  const navigation = useNavigation()
  const [userName, setUserName] = useState('Usuario')
  const [recentRoutines, setRecentRoutines] = useState([])

  useEffect(() => {
    let active = true

    const loadHomeData = async () => {
      try {
        const [profile, routines] = await Promise.all([loadUserProfile(), loadAllRoutines()])

        if (!active) {
          return
        }

        setUserName(profile.userName || 'Usuario')

        const sortedRoutines = [...routines].sort((a, b) => {
          const aTime = new Date(a.createdAt ?? 0).getTime()
          const bTime = new Date(b.createdAt ?? 0).getTime()
          return bTime - aTime
        })

        setRecentRoutines(sortedRoutines.slice(0, 3))
      } catch (error) {
        console.error('Error loading home data:', error)
      }
    }

    loadHomeData()

    return () => {
      active = false
    }
  }, [])

  const recentExercises = useMemo(() => {
    const seen = new Set()
    const collected = []

    for (const routine of recentRoutines) {
      for (const exercise of Array.isArray(routine.exercises) ? routine.exercises : []) {
        if (!exercise?.id || seen.has(exercise.id)) {
          continue
        }

        seen.add(exercise.id)
        collected.push({
          id: exercise.id,
          name: exercise.name,
          routineTitle: routine.title,
          imageUrl: exercise.imageUrl,
          sets: exercise.sets,
          reps: exercise.reps,
        })

        if (collected.length >= 4) {
          return collected
        }
      }
    }

    return collected
  }, [recentRoutines])

  const handleOpenRoutine = (routineId) => {
    if (!routineId) return
    navigation.navigate('RoutineDetail', { routineId })
  }

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <View className="absolute inset-0 bg-[#07060a]" />
      <View className="absolute -top-20 left-[-40px] h-56 w-56 rounded-full bg-[#25143f] opacity-28" />
      <View className="absolute right-[-32px] top-36 h-64 w-64 rounded-full bg-[#1a2246] opacity-20" />
      <View className="absolute bottom-32 left-10 h-24 w-24 rounded-full bg-[#2b1442] opacity-30" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 120 }}>
        <HomeHeader userName={userName} />

        <StreakRow />

        <View className="mt-8 rounded-[28px] border border-white/6 bg-[#0f1220] p-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-[#d6a6ff] text-xs uppercase tracking-[0.3em] font-bold">Recientes</Text>
              <Text className="text-white text-2xl font-extrabold mt-2">Últimas rutinas</Text>
            </View>
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#1b2447]">
              <Feather name="clock" size={18} color="#d6a6ff" />
            </View>
          </View>

          <View className="mt-4 gap-3">
            {recentRoutines.length ? (
              recentRoutines.map((routine) => (
                <TouchableOpacity
                  key={routine.id}
                  onPress={() => handleOpenRoutine(routine.id)}
                  className="rounded-3xl border border-white/5 bg-[#111427] p-4"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-white text-lg font-bold">{routine.title}</Text>
                      <Text className="text-[#b9a9cc] text-sm mt-1" numberOfLines={1}>
                        {routine.description}
                      </Text>
                    </View>

                    <View className="items-end">
                      <Text className="text-[#d6a6ff] text-sm font-semibold">
                        {Array.isArray(routine.exercises) ? routine.exercises.length : 0} ejercicios
                      </Text>
                      <Text className="text-[#7c8092] text-xs mt-1">
                        {routine.difficulty ? String(routine.difficulty).toUpperCase() : 'RUTINA'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="rounded-3xl border border-dashed border-white/10 bg-[#111427] p-4">
                <Text className="text-white font-semibold">Aún no tienes rutinas guardadas</Text>
                <Text className="text-[#b9a9cc] text-sm mt-1">
                  Crea tu primera rutina para verla aquí junto con tus ejercicios recientes.
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="mt-6 rounded-[28px] border border-white/6 bg-[#0f1220] p-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-[#d6a6ff] text-xs uppercase tracking-[0.3em] font-bold">Actividad</Text>
              <Text className="text-white text-2xl font-extrabold mt-2">Ejercicios recientes</Text>
            </View>
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#1b2447]">
              <Feather name="activity" size={18} color="#d6a6ff" />
            </View>
          </View>

          <View className="mt-4 gap-3">
            {recentExercises.length ? (
              recentExercises.map((exercise) => (
                <View key={exercise.id} className="rounded-3xl bg-[#111427] p-4">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-white text-base font-semibold">{exercise.name}</Text>
                      <Text className="text-[#b9a9cc] text-sm mt-1" numberOfLines={1}>
                        En {exercise.routineTitle}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-[#d6a6ff] text-sm font-semibold">
                        {exercise.sets}x{exercise.reps}
                      </Text>
                      <Text className="text-[#7c8092] text-xs mt-1">último bloque</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View className="rounded-3xl border border-dashed border-white/10 bg-[#111427] p-4">
                <Text className="text-white font-semibold">Tus ejercicios aparecerán aquí</Text>
                <Text className="text-[#b9a9cc] text-sm mt-1">
                  Guarda o crea una rutina para que esta sección se llene automáticamente.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
