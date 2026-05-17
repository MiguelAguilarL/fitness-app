import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../../components/Home/HomeHeader'
import StreakRow from '../../components/Home/StreakRow'

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 120 }}>
        <HomeHeader userName="Usuario" />

        <StreakRow />
      </ScrollView>
    </SafeAreaView>
  )
}
