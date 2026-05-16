import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function ExerciseVideoCard({ image }) {
  return (
    <View className="mt-8 overflow-hidden rounded-[30px] border border-[#2b2146] bg-[#15141b] p-3 shadow-black/30">
      <View className="overflow-hidden rounded-[24px]">
        <ImageBackground source={{ uri: image }} className="h-[220px] w-full" imageStyle={{ resizeMode: 'cover' }}>
          <View className="absolute inset-0 bg-black/55" />
          <View className="absolute inset-0 bg-[#261040]/20" />

          <View className="flex-1 items-center justify-center">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-[#8f46ff] shadow-black/30">
              <Feather name="play" size={36} color="#ffffff" style={{ marginLeft: 5 }} />
            </View>
          </View>

          <View className="absolute bottom-3 right-3 rounded-full bg-black/25 px-3 py-1.5">
            <Text className="text-[13px] font-semibold tracking-[1.8px] text-white/60">TÉCNICA</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}