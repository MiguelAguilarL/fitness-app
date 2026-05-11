import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function SessionTile() {
  const navigation = useNavigation()
  return (
    <TouchableOpacity 
      className="mt-3 rounded-[18px] bg-[#0f1220] px-4 py-4"
      onPress={() => navigation.navigate('ActiveExercise')}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-2xl bg-[#1b2447] items-center justify-center mr-3">
            <Feather name="activity" size={18} color="#d6a6ff" />
          </View>

          <View>
            <Text className="text-[#d6a6ff] font-extrabold text-[18px]">Calentamiento</Text>
            <Text className="text-[#b9a9cc] text-[15px] mt-0.5">Movilidad superior</Text>
          </View>
        </View>

        <View className="w-9 h-9 rounded-full bg-[#0b0f1a] items-center justify-center">
          <Feather name="chevron-right" size={18} color="#d6a6ff" />
        </View>
      </View>
    </TouchableOpacity>
  )
}
