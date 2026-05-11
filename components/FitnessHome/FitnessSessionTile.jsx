import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function FitnessSessionTile() {
  return (
    <TouchableOpacity className="mt-5 rounded-[22px] bg-[#0f1220] px-4 py-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-[#1b2447]">
            <Feather name="activity" size={18} color="#d6a6ff" />
          </View>

          <View>
            <Text className="text-[#d6a6ff] text-[18px] font-extrabold">Calentamiento</Text>
            <Text className="mt-0.5 text-[#b9a9cc] text-[15px]">Movilidad superior</Text>
          </View>
        </View>

        <View className="h-9 w-9 items-center justify-center rounded-full bg-[#0b0f1a]">
          <Feather name="chevron-right" size={18} color="#d6a6ff" />
        </View>
      </View>
    </TouchableOpacity>
  )
}