import React from 'react'
import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function FitnessSectionTitle({ label, count, className = '' }) {
  return (
    <View className={`flex-row items-center ${className}`}>
      <MaterialCommunityIcons name="weight-lifter" size={24} color="#a74cff" />
      <Text className="ml-2 text-[24px] font-black text-white">{label}</Text>

      <View className="ml-2 h-8 w-8 items-center justify-center rounded-full bg-[#a74cff]">
        <Text className="text-[16px] font-black text-white">{count}</Text>
      </View>
    </View>
  )
}