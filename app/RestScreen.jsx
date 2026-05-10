import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveExerciseHeader from '../components/ActiveExercise/ActiveExerciseHeader'
import ExerciseInfoSection from '../components/ActiveExercise/ExerciseInfoSection'
import ExerciseVideoCard from '../components/ActiveExercise/ExerciseVideoCard'
import SeriesList from '../components/ActiveExercise/SeriesList'
import TimerDisplay from '../components/ActiveExercise/TimerDisplay'
import ExerciseControls from '../components/ActiveExercise/ExerciseControls'

const exercise = {
  title: 'Remo Sentado',
  muscles: ['Espalda', 'Bíceps'],
  image:
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=1200&fit=crop&q=80',
}

const initialSeries = [
  { id: 's1', label: 'S1', previous: 'Ant: 30×10', weight: '35', reps: '10', completed: true },
  { id: 's2', label: 'S2', previous: 'Ant: 30×10', weight: '35', reps: '10', completed: false },
  { id: 's3', label: 'S3', previous: 'Ant: 30×10', weight: '35', reps: '10', completed: false },
]

const restDuration = 90

export default function RestScreen() {
  const [series, setSeries] = useState(initialSeries)
  const [restSeconds, setRestSeconds] = useState(restDuration)
  const [isResting, setIsResting] = useState(false)

  useEffect(() => {
    if (!isResting) return undefined

    const timer = setInterval(() => {
      setRestSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [isResting])

  useEffect(() => {
    if (isResting && restSeconds === 0) setIsResting(false)
  }, [isResting, restSeconds])

  const restLabel = useMemo(() => {
    const minutes = String(Math.floor(restSeconds / 60))
    const seconds = String(restSeconds % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }, [restSeconds])

  const completedCount = series.filter((item) => item.completed).length

  const handleToggleSeries = (seriesId) => {
    const currentItem = series.find((item) => item.id === seriesId)
    const nextCompleted = currentItem ? !currentItem.completed : false

    setSeries((currentSeries) =>
      currentSeries.map((item) => {
        if (item.id !== seriesId) return item
        return { ...item, completed: nextCompleted }
      }),
    )

    setRestSeconds(restDuration)
    setIsResting(nextCompleted)
  }

  const handleSkipRest = () => {
    setRestSeconds(0)
    setIsResting(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <StatusBar barStyle="light-content" backgroundColor="#07060a" />

      <View className="absolute inset-0 bg-[#07060a]" />
      <View className="absolute -top-20 left-0 h-52 w-52 rounded-full bg-[#25143f] opacity-30" />
      <View className="absolute right-0 top-24 h-56 w-56 rounded-full bg-[#1b2447] opacity-20" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 48 }}
      >
        <ActiveExerciseHeader />

        <ExerciseInfoSection title={exercise.title} muscles={exercise.muscles} exerciseImage={exercise.image} />

        <ExerciseVideoCard image={exercise.image} />

        <SeriesList completedCount={completedCount} totalCount={series.length} series={series} onToggleSeries={handleToggleSeries} />

        <TimerDisplay duration={restDuration} timeLeft={isResting ? restSeconds : 0} onFinish={() => setIsResting(false)} />

        <ExerciseControls onSkip={handleSkipRest} onStart={() => {}} />
      </ScrollView>
    </SafeAreaView>
  )
}
