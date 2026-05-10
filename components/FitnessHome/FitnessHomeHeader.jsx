import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function FitnessHomeHeader({ userName = 'Usuario' }) {
  const initial = userName.trim().charAt(0).toUpperCase() || 'U'

  return (
    <View>
      <View className="flex-row items-start justify-between">
        <View className="w-11 h-11 rounded-full bg-[#1a1430] items-center justify-center mt-1">
          <Text className="text-[#d6a6ff] text-base font-extrabold">{initial}</Text>
        </View>

        <TouchableOpacity className="w-11 h-11 rounded-full bg-[#101224] items-center justify-center mt-1">
          <Feather name="bell" size={18} color="#d6a6ff" />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-[#d6a6ff] text-[34px] leading-[34px] font-extrabold">
          ¡Tu puedes,
        </Text>
        <Text className="text-[#d6a6ff] text-[34px] leading-[34px] font-extrabold">
          ({userName})!
        </Text>
        <Text className="mt-2 text-[#b9a9cc] text-[18px] leading-6">
          ¿Listo para ser el mejor?
        </Text>
      </View>
    </View>
  )
}