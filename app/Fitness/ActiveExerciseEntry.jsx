import React from 'react'
import { StatusBar, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutCard from '../../components/Home/WorkoutCard'

export default function ActiveExerciseEntry() {
  return (
    <SafeAreaView edges={['top','bottom']} className="flex-1 bg-[#07060a]">
      <StatusBar barStyle="light-content" backgroundColor="#07060a" />

      <View className="px-4 pt-6">
        <Text className="text-[#d6a6ff] text-[26px] font-extrabold">Sesión de hoy</Text>
        <View className="h-3" />
        <WorkoutCard />
      </View>
    </SafeAreaView>
  )
}
