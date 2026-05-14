import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import exercises from '../utils/exercisesMock'

export default function SelectExercisesScreen() {
  const nav = useNavigation()
  const [selected, setSelected] = useState(new Set())

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleAgregar = () => {
    const selectedExercises = exercises
      .filter((e) => selected.has(e.id))
      .map((e) => ({ id: e.id, name: e.name }))
    nav.navigate('CreateRoutine', { selectedExercises })
  }

  const renderItem = ({ item }) => {
    const isSelected = selected.has(item.id)
    return (
      <TouchableOpacity
        onPress={() => toggle(item.id)}
        className={`flex-row items-center p-3 rounded-lg my-2 ${
          isSelected ? 'bg-[#0f1220] border border-white/6' : 'bg-transparent'
        }`}
      >
        <View className="w-14 h-10 bg-[#17171b] rounded-md items-center justify-center mr-3">
          <Text className="text-xs text-[#a9a9b8]">GIF</Text>
        </View>

        <View className="flex-1">
          <Text className="text-white font-semibold text-base">{item.name}</Text>
          <Text className="text-[#a9a9b8] text-sm mt-1">{item.muscle}</Text>
        </View>

        <View className="ml-3">
          {isSelected ? (
            <Feather name="check-circle" size={22} color="#d6a6ff" />
          ) : (
            <Feather name="circle" size={22} color="#3f3f46" />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/6">
        <TouchableOpacity onPress={() => nav.goBack()} className="p-2">
          <Feather name="arrow-left" size={22} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-bold">Seleccionar ejercicios</Text>

        <TouchableOpacity onPress={handleAgregar} className="p-2">
          <View className="flex-row items-center">
            <Feather name="check" size={18} color="#d6a6ff" />
            <Text className="text-[#d6a6ff] font-semibold ml-2">Agregar</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}
