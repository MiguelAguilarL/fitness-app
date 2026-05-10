import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

export default function FitnessExerciseCard({ title, subtitle, sets, reps, image }) {
  return (
    <View className="overflow-hidden rounded-[26px] border border-white/6 bg-[#17171b]">
      <View className="flex-row">
        <ImageBackground source={{ uri: image }} className="h-[190px] w-[34%]" imageStyle={{ resizeMode: 'cover' }}>
          <View className="absolute inset-0 bg-[#150a27]/70" />
          <View className="absolute inset-0 bg-black/10" />
        </ImageBackground>

        <View className="flex-1 px-4 py-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[22px] font-black text-white">{title}</Text>
              <View className="mt-1 flex-row items-center">
                <MaterialCommunityIcons name="dumbbell" size={18} color="#a74cff" />
                <Text className="ml-2 text-[17px] text-[#6f7588]">{subtitle}</Text>
              </View>
            </View>

            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-[#23232a]">
              <Feather name="chevron-right" size={22} color="#62667a" />
            </TouchableOpacity>
          </View>

          <View className="mt-5 flex-row flex-wrap gap-2.5">
            <View className="rounded-full bg-[#3c284f] px-4 py-2.5">
              <Text className="text-[16px] font-black text-[#d292ff]">{sets}</Text>
            </View>
            <View className="rounded-full bg-[#3c284f] px-4 py-2.5">
              <Text className="text-[16px] font-black text-[#d292ff]">{reps}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}