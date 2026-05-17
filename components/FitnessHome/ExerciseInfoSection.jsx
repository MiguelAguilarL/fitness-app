import React from 'react'
import { Text, View } from 'react-native'

export default function ExerciseInfoSection({ title, muscles }) {
  return (
    <View className="mt-8">
      <View>
        <Text className="text-[48px] font-black leading-[52px] text-white">{title}</Text>

        <View className="mt-6 self-start rounded-full border border-[#4a2e7a] bg-[#22182e] px-4 py-2">
          <Text className="text-[18px] font-semibold text-[#ddd6f7]">
            <Text className="text-[#8f46ff]">● </Text>
            {muscles.join(' • ')}
          </Text>
        </View>
      </View>
    </View>
  )
}