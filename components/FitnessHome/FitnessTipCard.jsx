import React from 'react'
import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function FitnessTipCard({ className = '' }) {
  return (
    <View className={`rounded-[24px] border border-[#5b2f87] bg-[#1b1227] px-4 py-4 ${className}`}>
      <View className="flex-row items-start">
        <View className="mr-3 h-12 w-12 items-center justify-center rounded-[14px] bg-[#3b2357]">
          <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#bb79ff" />
        </View>

        <View className="flex-1">
          <Text className="text-[22px] font-black text-white">Consejo del día</Text>
          <Text className="mt-1.5 text-[17px] leading-7 text-[#b1b3c7]">
            Mantén la espalda recta durante los jalones para maximizar la activación muscular y evitar lesiones.
          </Text>
        </View>
      </View>
    </View>
  )
}