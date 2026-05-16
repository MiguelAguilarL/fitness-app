import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function TechniqueButton({ label }) {
  return (
    <Pressable
      className="mt-5 rounded-full bg-[#8f46ff] px-6 py-4"
      style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
    >
      <View className="flex-row items-center justify-center gap-3">
        <Feather name="play" size={22} color="#ffffff" />
        <Text className="text-[19px] font-bold text-white">{label}</Text>
      </View>
    </Pressable>
  )
}