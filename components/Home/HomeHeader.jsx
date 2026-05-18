import React from 'react'
import { View, Text } from 'react-native'

export default function HomeHeader({ userName = 'Usuario' }) {
  return (
    <View>
      <View className="mt-2 items-center">
        <Text className="text-[#d6a6ff] text-[15px] uppercase tracking-[0.35em] font-bold">
          Bienvenido
        </Text>
        <Text className="text-[#d6a6ff] text-[30px] leading-8 font-extrabold text-center mt-2">
          {userName}
        </Text>
        <Text className="text-[#b9a9cc] text-[15px] text-center mt-2 max-w-[280px]">
          Tu progreso de hoy, tus rutinas recientes y lo que viene después.
        </Text>
      </View>
    </View>
  )
}
