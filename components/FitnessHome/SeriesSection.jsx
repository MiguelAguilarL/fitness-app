import React from 'react'
import { Text, View } from 'react-native'
import SeriesCard from './SeriesCard'

export default function SeriesSection({ completedCount, totalCount, series, onToggleSeries, onChangeSeriesWeight, onChangeSeriesReps }) {
  return (
    <View className="mt-8">
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
            onChangeWeight={(nextWeight) => onChangeSeriesWeight(item.id, nextWeight)}
            onChangeReps={(nextReps) => onChangeSeriesReps(item.id, nextReps)}
          />
        ))}
      </View>

      {completedCount > 0 && (
        <Text className="mt-1.5 text-[15px] text-[#7c8092]">
          {completedCount} de {totalCount} completadas
        </Text>
      )}
    </View>
  )
}