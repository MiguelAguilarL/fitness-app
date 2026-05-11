import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

const items = [
  { key: 'inicio', label: 'INICIO', icon: 'home', active: true },
  { key: 'rutinas', label: 'RUTINAS', icon: 'compass', active: false },
  { key: 'sesion', label: 'SESION', icon: 'activity', active: false },
  { key: 'progreso', label: 'PROGRESO', icon: 'trending-up', active: false },
  { key: 'perfil', label: 'PERFIL', icon: 'user', active: false },
]

export default function FitnessBottomNav() {
  return (
    <View className="absolute left-3 right-3 bottom-3 h-[76px] flex-row items-center justify-between rounded-[20px] bg-[#071029] px-2">
      {items.map((item) => {
        const color = item.active ? '#d6a6ff' : '#7b728e'

        return (
          <TouchableOpacity key={item.key} className="flex-1 items-center justify-center">
            <Feather name={item.icon} size={20} color={color} />
            <Text className="mt-1 text-[11px] font-semibold" style={{ color }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}