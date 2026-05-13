import React from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FitnessWorkoutHeader from '../../components/FitnessHome/FitnessWorkoutHeader'
import FitnessWarmupCard from '../../components/FitnessHome/FitnessWarmupCard'
import FitnessSectionTitle from '../../components/FitnessHome/FitnessSectionTitle'
import FitnessExerciseCard from '../../components/FitnessHome/FitnessExerciseCard'
import FitnessTipCard from '../../components/FitnessHome/FitnessTipCard'
import FitnessStartWorkoutButton from '../../components/FitnessHome/FitnessStartWorkoutButton'

const exercises = [
  {
    id: 'remo-sentado',
    title: 'Remo Sentado',
    subtitle: '3 series x 10 reps',
    sets: '3 sets',
    reps: '10 reps',
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&h=1200&fit=crop&q=80',
  },
  {
    id: 'curl-biceps',
    title: 'Curl de Bíceps',
    subtitle: '3 series x 10 reps',
    sets: '3 sets',
    reps: '10 reps',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=1200&fit=crop&q=80',
  },
]

export default function FitnessHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <StatusBar barStyle="light-content" backgroundColor="#07060a" />

      <View className="absolute inset-0 bg-[#07060a]" />
      <View className="absolute -top-20 left-0 h-52 w-52 rounded-full bg-[#25143f] opacity-30" />
      <View className="absolute right-0 top-24 h-56 w-56 rounded-full bg-[#1b2447] opacity-22" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 6, paddingBottom: 164 }}
      >
        <FitnessWorkoutHeader />

        <FitnessWarmupCard />

        <FitnessSectionTitle label="Ejercicios" count={2} className="mt-8" />

        <View className="mt-4 gap-4">
          {exercises.map((exercise) => (
            <FitnessExerciseCard key={exercise.id} {...exercise} />
          ))}
        </View>

        <FitnessTipCard className="mt-5" />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-4">
        <FitnessStartWorkoutButton />
      </View>
    </SafeAreaView>
  )
}
