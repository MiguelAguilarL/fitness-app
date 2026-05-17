import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PrimaryButton from '../PrimaryButton'

export default function WorkoutCard() {
  const navigation = useNavigation()
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop&q=80',
      }}
      className="h-72 rounded-[22px] overflow-hidden mt-3"
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View className="absolute inset-0 bg-black/40" />
      <View className="flex-1 p-3 justify-between">
        <View>
          <View className="self-start bg-[#1b2447] px-3 py-1 rounded-full">
            <Text className="text-[#d6a6ff] text-[14px] font-bold">Hipertrofia</Text>
          </View>
        </View>

        <View>
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="text-[#d6a6ff] text-[15px] opacity-80">⏱</Text>
            <Text className="text-[#d6a6ff] text-[14px] tracking-wide opacity-80 font-semibold">45 MINS</Text>
          </View>

          <Text className="text-[#d6a6ff] text-[34px] leading-[34px] font-extrabold">Espalda{`\n`}& Biceps</Text>

          <View className="flex-row mt-2">
            <View className="bg-[#2a2240] px-3 py-1 rounded-full mr-2">
              <Text className="text-[#d6a6ff] text-[14px]">8x</Text>
            </View>
            <View className="bg-[#2a2240] px-3 py-1 rounded-full mr-2">
              <Text className="text-[#d6a6ff] text-[14px]">4x</Text>
            </View>
            <View className="bg-[#2a2240] px-3 py-1 rounded-full">
              <Text className="text-[#d6a6ff] text-[14px]">+3</Text>
            </View>
          </View>

          <View className="mt-3 w-full">
            <PrimaryButton 
              label="Iniciar Entrenamiento" 
              size="card" 
              full 
              onPress={() => navigation.navigate('ActiveExerciseSession')}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}
