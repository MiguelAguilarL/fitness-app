import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function FitnessStartWorkoutButton() {
  return (
    <Pressable
      className="h-[66px] w-full rounded-full bg-[#8f46ff] shadow-black/60"
      style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
    >
      <View className="flex-1 flex-row items-center justify-center">
        <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <Feather name="play" size={18} color="#fff" style={{ marginLeft: 2 }} />
        </View>
        <Text className="text-[18px] font-black text-white">INICIAR ENTRENAMIENTO</Text>
      </View>
    </Pressable>
  )
}