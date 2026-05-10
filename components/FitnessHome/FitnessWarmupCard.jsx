import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function FitnessWarmupCard() {
  return (
    <View className="mt-6">
      <View className="mb-3 flex-row items-center">
        <MaterialCommunityIcons name="fire" size={22} color="#a74cff" />
        <Text className="ml-2 text-[24px] font-black text-white">Calentamiento</Text>
      </View>

      <View className="rounded-[26px] border border-white/5 bg-[#141418] px-3 py-3 shadow-black/50">
        <View className="flex-row flex-nowrap items-center justify-between">
          <View className="flex-row flex-1 items-center pr-3">
            <View className="h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-[#8f46ff]">
              <MaterialCommunityIcons name="human-handsup" size={28} color="#efe6ff" />
            </View>

            <View className="ml-3 flex-1 min-w-0">
              <Text numberOfLines={1} className="text-[18px] font-black text-white">
                Movilidad superior
              </Text>
              <Text numberOfLines={1} className="mt-1 text-[14px] text-[#6f7588]">
                Calentamiento • 5 min
              </Text>
            </View>
          </View>

          <TouchableOpacity className="h-[64px] w-[64px] items-center justify-center rounded-full bg-[#8f46ff]">
            <MaterialCommunityIcons name="play" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}