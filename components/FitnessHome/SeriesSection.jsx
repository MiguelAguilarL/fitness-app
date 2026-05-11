import React from 'react'
import { Text, View } from 'react-native'
import SeriesCard from './SeriesCard'

export default function SeriesSection({ completedCount, totalCount, series, onToggleSeries }) {
  return (
    <View className="mt-10">
      <Text className="text-[28px] font-black text-white">Series</Text>

      <View className="mt-4">
        {series.map((item) => (
          <SeriesCard
            key={item.id}
            label={item.label}
            previous={item.previous}
            weight={item.weight}
            reps={item.reps}
            completed={item.completed}
            onToggle={() => onToggleSeries(item.id)}
          />
        ))}
      </View>

      <Text className="mt-2 text-[16px] text-[#7c8092]">
        {completedCount} de {totalCount} completadas
      </Text>
    </View>
  )
}