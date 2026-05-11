import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PrimaryButton from '../PrimaryButton'

export default function FitnessWorkoutCard() {
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop&q=80',
      }}
      className="mt-5 h-[360px] overflow-hidden rounded-[28px]"
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View className="absolute inset-0 bg-black/35" />

      <View className="flex-1 p-4 justify-between">
        <View className="self-start rounded-full bg-[#1b2447] px-4 py-2">
          <Text className="text-[#d6a6ff] text-[15px] font-bold">Hipertrofia</Text>
        </View>

        <View>
          <View className="flex-row items-center">
            <Feather name="clock" size={15} color="#d6a6ff" />
            <Text className="ml-2 text-[#d6a6ff] text-[16px] font-extrabold tracking-wide">
              45 MINS
            </Text>
          </View>

          <Text className="mt-2 text-[#d6a6ff] text-[36px] leading-[36px] font-extrabold">
            Espalda{`\n`}& Bíceps
          </Text>

          <View className="mt-3 flex-row">
            <View className="mr-2 rounded-full bg-[#2a2240] px-4 py-2">
              <Text className="text-[#d6a6ff] text-[15px] font-semibold">8x</Text>
            </View>
            <View className="mr-2 rounded-full bg-[#2a2240] px-4 py-2">
              <Text className="text-[#d6a6ff] text-[15px] font-semibold">4x</Text>
            </View>
            <View className="rounded-full bg-[#2a2240] px-4 py-2">
              <Text className="text-[#d6a6ff] text-[15px] font-semibold">+3</Text>
            </View>
          </View>

          <View className="mt-5">
            <PrimaryButton label="Iniciar Entrenamiento" size="card" full />
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}