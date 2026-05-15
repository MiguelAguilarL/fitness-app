import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../../components/Home/HomeHeader'
import StreakRow from '../../components/Home/StreakRow'
import WorkoutCard from '../../components/Home/WorkoutCard'
import SessionTile from '../../components/Home/SessionTile'
import { useQuestionnaire } from '../../context/QuestionnaireContext'

export default function HomeScreen() {
  const navigation = useNavigation()
  const { profile } = useQuestionnaire()

  const profileLabel = profile?.recommendedSplit?.label || profile?.recommendedSplit || 'tu plan personalizado'

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 120 }}>
        <HomeHeader userName="Usuario" />

        <StreakRow />

        <View style={{ marginTop: 18 }} />

        <Text className="text-[#d6a6ff] text-[26px] font-extrabold">Sesión de hoy</Text>

        <WorkoutCard />

        <View className="h-5" />

        <SessionTile />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Exercises')}
          className="mt-5 overflow-hidden rounded-[28px] border border-white/6 bg-[#11111a] px-5 py-5"
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-[15px] font-semibold uppercase tracking-[2px] text-[#8f86a5]">
                Descubrir ejercicios
              </Text>
              <Text className="mt-2 text-[24px] font-extrabold text-white">
                Explora ejercicios según tu perfil
              </Text>
              <Text className="mt-2 text-[14px] leading-5 text-[#8f86a5]">
                Lista inicial basada en {profileLabel}. Busca por músculo, nombre o equipamiento y reutiliza resultados guardados.
              </Text>
            </View>

            <View className="h-12 w-12 items-center justify-center rounded-full bg-[#d6a6ff]">
              <Feather name="search" size={20} color="#4d1595" />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
