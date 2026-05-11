import React from 'react'
import { View, Pressable, Text } from 'react-native'
import PrimaryButton from '../../components/PrimaryButton'
import { Feather } from '@expo/vector-icons'

export default function ExerciseControls({ onSkip, onStart }) {
  return (
    <View className="mx-4 mt-6 mb-6">
      <PrimaryButton label="Ver Técnica" size="md" onPress={onStart} full={true} />

      <Pressable onPress={onSkip} className="mt-4 mx-4 rounded-[24px] border border-[#4a2e7a] p-4">
        <View className="flex-row items-center justify-center gap-3">
          <Text className="font-extrabold text-[#ddd6f7] text-[18px]">Saltar Descanso</Text>
          <Feather name="arrow-right" size={20} color="#ddd6f7" />
        </View>
      </Pressable>
    </View>
  )
}
