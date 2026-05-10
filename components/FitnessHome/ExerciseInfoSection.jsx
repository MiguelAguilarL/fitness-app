import React from 'react'
import { Text, View, ImageBackground } from 'react-native'

export default function ExerciseInfoSection({ title, muscles, exerciseImage }) {
  return (
    <View className="mt-8 flex-row items-start justify-between gap-4">
      <View className="flex-1">
        <Text className="text-[48px] font-black leading-[52px] text-white">{title}</Text>

        <View className="mt-6 self-start rounded-full border border-[#4a2e7a] bg-[#22182e] px-4 py-2">
          <Text className="text-[18px] font-semibold text-[#ddd6f7]">
            <Text className="text-[#8f46ff]">● </Text>
            {muscles.join(' • ')}
          </Text>
        </View>
      </View>

      <ImageBackground
        source={{ uri: exerciseImage }}
        className="mt-2 h-[180px] w-[150px] overflow-hidden rounded-[30px]"
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View className="absolute inset-0 bg-black/30" />
      </ImageBackground>
    </View>
  )
}