import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveExerciseHeader from '../../components/FitnessHome/ActiveExerciseHeader'
import ExerciseInfoSection from '../../components/FitnessHome/ExerciseInfoSection'
import ExerciseVideoCard from '../../components/FitnessHome/ExerciseVideoCard'
import SeriesSection from '../../components/FitnessHome/SeriesSection'
import RestTimerSection from '../../components/FitnessHome/RestTimerSection'
import { getRoutineById } from '../../utils/routinesStorage'

const FALLBACK_EXERCISE_IMAGE =
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=1200&fit=crop&q=80'

const restDuration = 90

function buildSeriesForExercise(exercise) {
  const sets = Math.max(1, Number(exercise?.sets) || 3)
  const reps = String(Number(exercise?.reps) || 10)

  return Array.from({ length: sets }, (_, index) => ({
    id: `${exercise?.id ?? 'exercise'}-s${index + 1}`,
    label: `S${index + 1}`,
    previous: `Ant: --×${reps}`,
    weight: '0',
    reps,
    completed: false,
  }))
}

export default function ActiveExerciseScreen({ route }) {
  const routineId = route?.params?.routineId
  const [routine, setRoutine] = useState(null)
  const [loadingRoutine, setLoadingRoutine] = useState(true)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [series, setSeries] = useState([])
  const [restSeconds, setRestSeconds] = useState(restDuration)
  const [isResting, setIsResting] = useState(false)
  const [activeRestSeriesId, setActiveRestSeriesId] = useState(null)

  useEffect(() => {
    let mounted = true

    const loadRoutine = async () => {
      setLoadingRoutine(true)

      try {
        const foundRoutine = await getRoutineById(routineId)
        if (!mounted) {
          return
        }

        setRoutine(foundRoutine)
      } catch (error) {
        console.error('Error loading active routine:', error)
        if (mounted) {
          setRoutine(null)
        }
      } finally {
        if (mounted) {
          setLoadingRoutine(false)
        }
      }
    }

    loadRoutine()

    return () => {
      mounted = false
    }
  }, [routineId])

  const exercises = Array.isArray(routine?.exercises) ? routine.exercises : []
  const currentExercise = exercises[exerciseIndex] ?? null

  useEffect(() => {
    if (!currentExercise) {
      setSeries([])
      return
    }

    setSeries(buildSeriesForExercise(currentExercise))
    setRestSeconds(restDuration)
    setIsResting(false)
    setActiveRestSeriesId(null)
  }, [currentExercise?.id])

  useEffect(() => {
    if (!isResting) {
      return undefined
    }

    const timer = setInterval(() => {
      setRestSeconds((currentSeconds) => (currentSeconds > 0 ? currentSeconds - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [isResting])

  useEffect(() => {
    if (isResting && restSeconds === 0) {
      setIsResting(false)
    }
  }, [isResting, restSeconds])

  const restLabel = useMemo(() => {
    const minutes = String(Math.floor(restSeconds / 60))
    const seconds = String(restSeconds % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }, [restSeconds])

  const completedCount = series.filter((item) => item.completed).length
  const canGoPrev = exerciseIndex > 0
  const canGoNext = exerciseIndex < exercises.length - 1
  const exerciseTitle = currentExercise?.name ?? 'Ejercicio'
  const exerciseMuscles =
    (currentExercise?.targetMuscles?.length ? currentExercise.targetMuscles : currentExercise?.bodyParts) ?? []
  const exerciseImage = currentExercise?.imageUrl || FALLBACK_EXERCISE_IMAGE
  const exerciseInstructions = Array.isArray(currentExercise?.instructions)
    ? currentExercise.instructions.filter(Boolean)
    : []

  const handleToggleSeries = (seriesId) => {
    const currentItem = series.find((item) => item.id === seriesId)
    const nextCompleted = currentItem ? !currentItem.completed : false
    const nextSeries = series.map((item) => {
      if (item.id !== seriesId) {
        return item
      }

      return { ...item, completed: nextCompleted }
    })

    setSeries(nextSeries)

    if (nextCompleted) {
      setActiveRestSeriesId(seriesId)
      setRestSeconds(restDuration)
      setIsResting(true)
      return
    }

    if (activeRestSeriesId === seriesId) {
      const remainingCompletedSeries = nextSeries.filter((item) => item.completed)
      const fallbackSeries = remainingCompletedSeries[remainingCompletedSeries.length - 1]

      if (fallbackSeries) {
        setActiveRestSeriesId(fallbackSeries.id)
        setIsResting(true)
        return
      }

      setActiveRestSeriesId(null)
      setRestSeconds(restDuration)
      setIsResting(false)
    }
  }

  const handleSkipRest = () => {
    setRestSeconds(0)
    setIsResting(false)
  }

  const handlePrevExercise = () => {
    if (!canGoPrev) {
      return
    }

    setExerciseIndex((current) => Math.max(0, current - 1))
  }

  const handleNextExercise = () => {
    if (!canGoNext) {
      return
    }

    setExerciseIndex((current) => Math.min(exercises.length - 1, current + 1))
  }

  if (loadingRoutine) {
    return (
      <SafeAreaView className="flex-1 bg-[#07060a] items-center justify-center">
        <Text className="text-white">Cargando sesión...</Text>
      </SafeAreaView>
    )
  }

  if (!routine || !currentExercise) {
    return (
      <SafeAreaView className="flex-1 bg-[#07060a] items-center justify-center px-8">
        <Text className="text-white text-lg font-semibold text-center">No hay ejercicios para entrenar</Text>
        <Text className="text-[#a9a9b8] text-center mt-3">
          Crea una rutina personalizada o abre una rutina que tenga ejercicios.
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <StatusBar barStyle="light-content" backgroundColor="#07060a" />

      <View className="absolute inset-0 bg-[#07060a]" />
      <View className="absolute -top-24 left-[-32px] h-56 w-56 rounded-full bg-[#25143f] opacity-24" />
      <View className="absolute right-[-28px] top-20 h-60 w-60 rounded-full bg-[#1b2447] opacity-16" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 8, paddingBottom: 132 }}
      >
        <View className="w-full max-w-[460px] self-center">
          <ActiveExerciseHeader />

          <View className="mt-4 rounded-[16px] border border-white/6 bg-[#0f1220] px-4 py-3">
            <Text className="text-[#a9a9b8] text-xs uppercase tracking-[1.8px]">Rutina</Text>
            <Text className="text-white text-lg font-semibold mt-1">{routine.title}</Text>
            <Text className="text-[#b9a9cc] text-sm mt-1">
              Ejercicio {exerciseIndex + 1} de {exercises.length}
            </Text>
          </View>

          <ExerciseInfoSection
            title={exerciseTitle}
            muscles={exerciseMuscles.length ? exerciseMuscles : ['General']}
            exerciseImage={exerciseImage}
          />

          <ExerciseVideoCard image={exerciseImage} videoUrl={currentExercise?.videoUrl} />

          <View className="mt-6 rounded-[22px] border border-white/6 bg-[#0f1220] p-4">
            <Text className="text-white text-base font-semibold mb-3">Instrucciones</Text>
            {exerciseInstructions.length ? (
              <View className="gap-2">
                {exerciseInstructions.map((step, index) => (
                  <View key={`${currentExercise.id}-step-${index}`} className="flex-row items-start">
                    <Text className="text-[#d6a6ff] mr-2 mt-0.5">{index + 1}.</Text>
                    <Text className="text-[#d8d8df] flex-1 leading-5">{step}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-[#a9a9b8]">Sin instrucciones disponibles para este ejercicio.</Text>
            )}
          </View>

          <View className="mt-5 flex-row gap-3">
            <TouchableOpacity
              onPress={handlePrevExercise}
              disabled={!canGoPrev}
              className={`flex-1 rounded-full border py-3 ${
                canGoPrev
                  ? 'border-[#d6a6ff]/30 bg-[#d6a6ff]/10'
                  : 'border-white/10 bg-white/5 opacity-45'
              }`}
            >
              <Text className="text-center text-white font-semibold">Anterior</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNextExercise}
              disabled={!canGoNext}
              className={`flex-1 rounded-full border py-3 ${
                canGoNext
                  ? 'border-[#d6a6ff]/30 bg-[#d6a6ff]/10'
                  : 'border-white/10 bg-white/5 opacity-45'
              }`}
            >
              <Text className="text-center text-white font-semibold">Siguiente</Text>
            </TouchableOpacity>
          </View>

          <SeriesSection
            completedCount={completedCount}
            totalCount={series.length}
            series={series}
            onToggleSeries={handleToggleSeries}
          />

          {completedCount > 0 && (
            <RestTimerSection
              label={isResting ? restLabel : '--:--'}
              onSkipRest={handleSkipRest}
              progress={isResting ? restSeconds / restDuration : 0}
              disabled={!isResting}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
