import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function ExerciseVideoCard({ image }) {
  return (
    <View className="mt-10 overflow-hidden rounded-[34px] border border-[#2b2146] bg-[#15141b] p-4 shadow-black/30">
      <View className="overflow-hidden rounded-[26px]">
        <ImageBackground source={{ uri: image }} className="h-[250px] w-full" imageStyle={{ resizeMode: 'cover' }}>
          <View className="absolute inset-0 bg-black/55" />
          <View className="absolute inset-0 bg-[#261040]/20" />

          <View className="flex-1 items-center justify-center">
            <View className="h-24 w-24 items-center justify-center rounded-full bg-[#8f46ff] shadow-black/30">
              <Feather name="play" size={42} color="#ffffff" style={{ marginLeft: 6 }} />
            </View>
          </View>

          <View className="absolute bottom-4 right-4 rounded-full bg-black/25 px-4 py-2">
            <Text className="text-[16px] font-semibold tracking-[2px] text-white/60">TÉCNICA</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}