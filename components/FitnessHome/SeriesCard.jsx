import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function SeriesCard({ label, previous, weight, reps, completed, onToggle }) {
  return (
    <View className="mb-3 overflow-hidden rounded-[24px] border border-white/5 bg-[#1a1a25] px-3 py-3">
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-[56px] items-center justify-center rounded-[14px] border border-[#4a2e7a] bg-[#21172f]">
          <Text className="text-[18px] font-bold text-[#9b59ff]">{label}</Text>
        </View>

        <View className="flex-1 flex-row gap-2">
          <View className="flex-1 rounded-[16px] bg-[#111119] px-3 py-3">
            <Text className="text-[12px] font-semibold tracking-[1px] text-[#8d92a5]">PESO</Text>
            <View className="mt-1 flex-row items-end gap-1">
              <Text className="text-[28px] font-black leading-[30px] text-white">{weight}</Text>
              <Text className="pb-0.5 text-[16px] text-[#9297ab]">kg</Text>
            </View>
          </View>

          <View className="flex-1 rounded-[16px] bg-[#111119] px-3 py-3">
            <Text className="text-[12px] font-semibold tracking-[1px] text-[#8d92a5]">REPS</Text>
            <Text className="mt-1 text-[28px] font-black leading-[30px] text-white">{reps}</Text>
          </View>
        </View>

        <Pressable
          onPress={onToggle}
          className={`h-[70px] w-[70px] items-center justify-center rounded-full ${completed ? 'bg-[#8f46ff]' : 'bg-[#0f1017] border border-white/10'}`}
          style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
        >
          <Feather name={completed ? 'check' : 'circle'} size={34} color={completed ? '#ffffff' : '#4f5467'} />
        </Pressable>
      </View>
    </View>
  )
}