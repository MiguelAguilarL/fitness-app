import React from 'react'
import { View, Text } from 'react-native'

function formatDuration(mins) {
  if (mins == null) return '--'
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

function formatKg(n) {
  if (n == null) return '--'
  try {
    return `${Number(n).toLocaleString()} kg`
  } catch (e) {
    return `${n} kg`
  }
}

export default function WeeklySummaryWidget({ className = '', sessions = 0, durationMins = 0, volumeKg = 0, records = 0 }) {
  return (
    <View className={`mt-4 rounded-[18px] bg-[#0f1114] p-5 border border-white/6 ${className}`}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[#bdb8c8] text-sm">Tu resumen semanal</Text>
          <Text className="text-white text-3xl font-extrabold mt-1 leading-tight">Resumen de la semana</Text>
        </View>

        <View className="w-10 h-10 rounded-full bg-[#2b1b3a] items-center justify-center">
          <Text className="text-[#d6a6ff] font-bold">{records}</Text>
        </View>
      </View>

      <View className="mt-5 flex-row justify-between">
        <View className="items-center flex-1">
          <Text className="text-[#a9a9b8]">Entrenamientos</Text>
          <Text className="text-white text-2xl font-extrabold mt-1">{sessions}</Text>
        </View>

        <View className="items-center flex-1">
          <Text className="text-[#a9a9b8]">Duración</Text>
          <Text className="text-white text-2xl font-extrabold mt-1">{formatDuration(durationMins)}</Text>
        </View>

        <View className="items-center flex-1">
          <Text className="text-[#a9a9b8]">Volumen</Text>
          <Text className="text-white text-2xl font-extrabold mt-1">{formatKg(volumeKg)}</Text>
        </View>
      </View>
    </View>
  )
}
