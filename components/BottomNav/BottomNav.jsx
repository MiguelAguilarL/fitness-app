import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function BottomNav() {
  const navigation = useNavigation()

  return (
    <View className="absolute left-3 right-3 bottom-3 h-16 rounded-[18px] bg-[#071029] px-2 flex-row items-center justify-between">
      <TouchableOpacity className="flex-1 items-center justify-center" onPress={() => navigation.navigate('Home')}>
        <Feather name="home" size={20} color="#d6a6ff" />
        <Text className="text-[#d6a6ff] text-[11px] mt-1 font-semibold">INICIO</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 items-center justify-center" onPress={() => navigation.navigate('FitnessHome')}>
        <Feather name="compass" size={20} color="#7b728e" />
        <Text className="text-[#7b728e] text-[11px] mt-1 font-semibold">RUTINAS</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 items-center justify-center" onPress={() => navigation.navigate('ActiveExercise')}>
        <Feather name="activity" size={20} color="#7b728e" />
        <Text className="text-[#7b728e] text-[11px] mt-1 font-semibold">SESION</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 items-center justify-center" onPress={() => navigation.navigate('Performance')}>
        <Feather name="trending-up" size={20} color="#7b728e" />
        <Text className="text-[#7b728e] text-[11px] mt-1 font-semibold">PROGRESO</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 items-center justify-center" onPress={() => navigation.navigate('Profile')}>
        <Feather name="user" size={20} color="#7b728e" />
        <Text className="text-[#7b728e] text-[11px] mt-1 font-semibold">PERFIL</Text>
      </TouchableOpacity>
    </View>
  )
}
