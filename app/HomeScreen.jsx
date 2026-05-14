import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../components/Home/HomeHeader'
import StreakRow from '../components/Home/StreakRow'
import WeeklySummaryWidget from '../components/FitnessHome/WeeklySummaryWidget'

export default function HomeScreen() {
  const weeklyStats = {
    sessions: 2,
    durationMins: 12,
    volumeKg: 3606,
    records: 30,
  }
  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 120 }}>
        <HomeHeader userName="Usuario" />

        <StreakRow />

        <WeeklySummaryWidget {...weeklyStats} />
      </ScrollView>
    </SafeAreaView>
  )
}
