import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ActiveExerciseHeader() {
  const navigation = useNavigation()
  
  return (
    <View className="pt-2">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity 
          className="h-20 w-20 items-center justify-center rounded-full bg-[#17151f] shadow-black/40"
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={34} color="#f5f0ff" />
        </TouchableOpacity>

        <Text className="text-[20px] font-semibold text-[#9da2b3]">Ejercicio Activo</Text>

        <TouchableOpacity className="h-20 w-20 items-center justify-center rounded-full bg-[#17151f] shadow-black/40">
          <Feather name="more-horizontal" size={28} color="#f5f0ff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}