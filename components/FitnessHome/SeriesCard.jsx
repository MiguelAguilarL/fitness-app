import React from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function SeriesCard({
  label,
  previous,
  weight,
  reps,
  completed,
  onToggle,
  onChangeWeight,
  onChangeReps,
}) {
  const seriesNumber = String(label).replace(/^S/i, '')

  const normalizedWeight = String(weight ?? '')
  const normalizedReps = String(reps ?? '')

  return (
    <View className="mb-2.5 overflow-hidden rounded-[22px] border border-white/5 bg-[#1a1a25] px-3 py-2.5">
      <View className="flex-row items-center gap-2.5">
        <View className="h-11 w-[60px] items-center justify-center rounded-[13px] border border-[#4a2e7a] bg-[#21172f] px-1">
          <Text className="text-[10px] font-semibold tracking-[1.8px] text-[#c59aff]">SERIE</Text>
          <Text className="-mt-0.5 text-[15px] font-bold text-[#9b59ff]">{seriesNumber}</Text>
        </View>

        <View className="flex-1 flex-row gap-2">
          <View className="flex-1 rounded-[15px] bg-[#111119] px-3 py-2.5">
            <Text className="text-[12px] font-semibold tracking-[1px] text-[#8d92a5]">PESO</Text>
            <View className="mt-1 flex-row items-center gap-1">
              <TextInput
                value={normalizedWeight}
                onChangeText={onChangeWeight}
                keyboardType="numeric"
                maxLength={3}
                className="min-w-[44px] text-[24px] font-black leading-[26px] text-white"
                style={{ padding: 0 }}
              />
              <Text className="pb-0.5 text-[16px] text-[#9297ab]">kg</Text>
            </View>
          </View>

          <View className="flex-1 rounded-[15px] bg-[#111119] px-3 py-2.5">
            <Text className="text-[12px] font-semibold tracking-[1px] text-[#8d92a5]">REPS</Text>
            <TextInput
              value={normalizedReps}
              onChangeText={onChangeReps}
              keyboardType="numeric"
              maxLength={2}
              className="mt-1 text-[24px] font-black leading-[26px] text-white"
              style={{ padding: 0 }}
            />
          </View>
        </View>

        <Pressable
          onPress={onToggle}
          className={`h-[62px] w-[62px] items-center justify-center rounded-full ${completed ? 'bg-[#8f46ff]' : 'bg-[#0f1017] border border-white/10'}`}
          style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}
        >
          <Feather name={completed ? 'check' : 'circle'} size={30} color={completed ? '#ffffff' : '#4f5467'} />
        </Pressable>
      </View>
    </View>
  )
}