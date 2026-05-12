import React from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import ProgressBar from '../components/ProgressBar'

const stats = [
  { label: 'Calorías', value: '24,500', trend: '+12%', icon: 'fire' },
  { label: 'Entrenamientos', value: '16', trend: '+9%', icon: 'clock' },
  { label: 'Fuerza', value: '92', trend: '+5%', icon: 'bar-chart-2' },
  { label: 'Rutinas', value: '7', trend: '+2%', icon: 'layers' },
]

const recentActivity = [
  {
    title: 'Upper Body Power',
    subtitle: 'Circuito intenso • 42 min',
    level: 'Fuerte',
    bg: '#30144e',
  },
  {
    title: 'Lower Body Strength',
    subtitle: 'Piernas y glúteos • 36 min',
    level: 'Medio',
    bg: '#1d274c',
  },
  {
    title: 'Active Recovery',
    subtitle: 'Estiramientos suaves • 18 min',
    level: 'Recuperación',
    bg: '#1d2b3d',
  },
]

export default function PerformanceScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <StatusBar barStyle="light-content" backgroundColor="#07060a" />
      <View className="absolute inset-0 bg-[#07060a]" />
      <View className="absolute -top-20 left-0 h-52 w-52 rounded-full bg-[#25143f] opacity-30" />
      <View className="absolute right-0 top-24 h-56 w-56 rounded-full bg-[#1b2447] opacity-25" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="h-11 w-11 items-center justify-center rounded-2xl border border-[#4d3f7e]"
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={22} color="#d6a6ff" />
          </TouchableOpacity>

          <View className="items-end">
            <Text className="text-xs uppercase text-[#8b79b7] tracking-[0.3em]">Performance</Text>
            <Text className="text-2xl font-extrabold text-white">Overview</Text>
          </View>
        </View>

        <View className="mt-7 rounded-[28px] bg-[#101025] p-5 shadow-lg shadow-[#120f27]">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-[#9a80e4]">Volumen progresivo</Text>
              <Text className="mt-2 text-3xl font-extrabold text-white">83%</Text>
            </View>
            <View className="h-16 w-16 items-center justify-center rounded-3xl bg-[#1b1f42]">
              <Feather name="trending-up" size={28} color="#d6a6ff" />
            </View>
          </View>

          <View className="mt-5 h-44 overflow-hidden rounded-3xl bg-[#12122d] p-4 shadow-inner shadow-[#00000060]">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-[#9a80e4]">Este mes</Text>
              <Text className="text-sm text-[#8a84b4]">+18% respecto a la semana pasada</Text>
            </View>

            <View className="mt-4 flex-1 justify-end">
              <View className="absolute left-6 right-6 top-6 h-[2px] bg-[#2c2d4a]" />
              <View className="absolute left-6 right-6 top-16 h-[2px] bg-[#2c2d4a]" />
              <View className="absolute left-6 right-6 top-28 h-[2px] bg-[#2c2d4a]" />

              <View className="flex-row items-end justify-between">
                <View className="h-10 w-5 rounded-full bg-[#5f4ad2]" />
                <View className="h-14 w-5 rounded-full bg-[#7a55ff]" />
                <View className="h-20 w-5 rounded-full bg-[#d6a6ff]" />
                <View className="h-16 w-5 rounded-full bg-[#7a55ff]" />
                <View className="h-22 w-5 rounded-full bg-[#c788ff]" />
                <View className="h-18 w-5 rounded-full bg-[#8e71ff]" />
              </View>
            </View>
          </View>
        </View>

        <View className="mt-6 grid gap-4">
          {stats.map((item) => (
            <View key={item.label} className="rounded-3xl bg-[#101025] p-4 shadow-lg shadow-[#100f2a]">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-sm text-[#8b79b7]">{item.label}</Text>
                  <Text className="mt-2 text-2xl font-extrabold text-white">{item.value}</Text>
                </View>
                <View className="h-12 w-12 items-center justify-center rounded-3xl bg-[#17172f]">
                  <Feather name={item.icon} size={20} color="#d6a6ff" />
                </View>
              </View>
              <Text className="mt-3 text-sm text-[#8e86b3]">Tendencia {item.trend}</Text>
              <ProgressBar progress={Math.random() * 0.35 + 0.55} />
            </View>
          ))}
        </View>

        <View className="mt-6 rounded-[28px] bg-[#101025] p-5 shadow-lg shadow-[#050613]">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-[#9a80e4]">Actividad reciente</Text>
              <Text className="mt-2 text-xl font-bold text-white">Resumen de entrenamiento</Text>
            </View>
            <TouchableOpacity className="rounded-2xl border border-[#4d3f7e] px-4 py-2">
              <Text className="text-sm text-[#d6a6ff]">Ver todo</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-5 space-y-4">
            {recentActivity.map((item) => (
              <View key={item.title} className="rounded-3xl bg-[#12112d] p-4">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-base font-semibold text-white">{item.title}</Text>
                    <Text className="mt-1 text-sm text-[#8e86b3]">{item.subtitle}</Text>
                  </View>
                  <View className="rounded-2xl bg-[#25244b] px-3 py-1">
                    <Text className="text-xs uppercase text-[#c3b6ff]">{item.level}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
