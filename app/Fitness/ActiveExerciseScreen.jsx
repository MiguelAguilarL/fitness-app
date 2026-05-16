import React, { useEffect, useMemo, useState } from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActiveExerciseHeader from '../../components/FitnessHome/ActiveExerciseHeader'
import ExerciseInfoSection from '../../components/FitnessHome/ExerciseInfoSection'
import ExerciseVideoCard from '../../components/FitnessHome/ExerciseVideoCard'
import SeriesSection from '../../components/FitnessHome/SeriesSection'
import RestTimerSection from '../../components/FitnessHome/RestTimerSection'

const exercise = {
  title: 'Remo Sentado',
  muscles: ['Espalda', 'Bíceps'],
  image:
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=1200&fit=crop&q=80',
}

const initialSeries = [
  { id: 's1', label: 'S1', previous: 'Ant: 30×10', weight: '35', reps: '10', completed: false },
  { id: 's2', label: 'S2', previous: 'Ant: 30×10', weight: '35', reps: '10', completed: false },
  { id: 's3', label: 'S3', previous: 'Ant: 30×10', weight: '35', reps: '10', completed: false },
]

const restDuration = 90

export default function ActiveExerciseScreen() {
  const [series, setSeries] = useState(initialSeries)
  const [restSeconds, setRestSeconds] = useState(restDuration)
  const [isResting, setIsResting] = useState(false)
  const [activeRestSeriesId, setActiveRestSeriesId] = useState(null)

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

          <ExerciseInfoSection title={exercise.title} muscles={exercise.muscles} exerciseImage={exercise.image} />

          <ExerciseVideoCard image={exercise.image} />

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
