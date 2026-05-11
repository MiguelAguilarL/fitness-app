import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import HomeHeader from '../components/Home/HomeHeader'
import StreakRow from '../components/Home/StreakRow'
import WorkoutCard from '../components/Home/WorkoutCard'
import SessionTile from '../components/Home/SessionTile'
import BottomNav from '../components/Home/BottomNav'

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#07060a]">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 110 }}>
        <HomeHeader userName="Usuario" />

        <StreakRow />

        <View style={{ marginTop: 18 }} />

        <Text className="text-[#d6a6ff] text-[26px] font-extrabold">Sesión de hoy</Text>

        <WorkoutCard />

        <View className="h-5" />

        <SessionTile />
      </ScrollView>

      <BottomNav />
    </View>
  )
}
