import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function HomeHeader({ userName = 'Usuario' }) {
  return (
    <View>
      <View className="flex-row items-start justify-between">
        <View className="w-11 h-11 rounded-full bg-[#1b1328] items-center justify-center mt-1">
          <Text className="text-[#d6a6ff] text-base font-extrabold">{userName.charAt(0).toUpperCase()}</Text>
        </View>

        <TouchableOpacity className="w-10 h-10 rounded-full bg-[#0f1220] items-center justify-center mt-1">
          <Feather name="bell" size={18} color="#d6a6ff" />
        </TouchableOpacity>
      </View>

      <View className="mt-3">
        <Text className="text-[#d6a6ff] text-[31px] leading-8 font-extrabold">¡Tu puedes,</Text>
        <Text className="text-[#d6a6ff] text-[31px] leading-8 font-extrabold">({userName})!</Text>
        <Text className="text-[#b9a9cc] mt-1 text-[17px]">¿Listo para ser el mejor?</Text>
      </View>
    </View>
  )
}
