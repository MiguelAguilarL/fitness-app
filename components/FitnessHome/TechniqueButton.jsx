import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function TechniqueButton({ label }) {
  return (
    <Pressable
      className="mt-6 rounded-full bg-[#8f46ff] px-7 py-6"
      style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
    >
      <View className="flex-row items-center justify-center gap-3">
        <Feather name="play" size={26} color="#ffffff" />
        <Text className="text-[22px] font-bold text-white">{label}</Text>
      </View>
    </Pressable>
  )
}