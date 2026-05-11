import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function FitnessWorkoutHeader() {
  const navigation = useNavigation()
  
  return (
    <View className="pt-1">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity 
          className="h-16 w-16 items-center justify-center rounded-full bg-[#17151f] shadow-black/40"
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#f5f0ff" />
        </TouchableOpacity>

        <TouchableOpacity className="h-16 w-16 items-center justify-center rounded-full bg-[#17151f] shadow-black/40">
          <Feather name="more-horizontal" size={22} color="#f5f0ff" />
        </TouchableOpacity>
      </View>

      <View className="mt-2 items-center">
        <Text className="text-[#ad67ff] text-[15px] font-black tracking-[3px]">LIAMGYM</Text>
        <Text className="mt-1 text-center text-[32px] leading-[34px] font-black text-white">
          Espalda & Bíceps
        </Text>
      </View>

      <View className="mt-4 flex-row items-center justify-center">
        <View className="flex-row items-center">
          <Feather name="clock" size={22} color="#ad67ff" />
          <Text className="ml-2 text-[22px] leading-[26px] text-[#a5a9be]">45 min</Text>
        </View>

        <View className="mx-4 h-1.5 w-1.5 rounded-full bg-[#384055]" />

        <View className="rounded-full border border-[#5b2f87] bg-[#281632] px-4 py-2">
          <Text className="text-[18px] font-bold text-[#bc6cff]">Hipertrofia</Text>
        </View>
      </View>
    </View>
  )
}