import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import FitnessDayPill from './FitnessDayPill'

const dayItems = [
  { day: 'L', dateNum: '' },
  { day: 'M', dateNum: '' },
  { day: 'M', dateNum: '' },
  { day: 'J', dateNum: '24' },
  { day: 'V', dateNum: '' },
  { day: 'S', dateNum: '' },
  { day: 'D', dateNum: '' },
]

export default function FitnessStreakRow() {
  const [selectedDay, setSelectedDay] = useState(3)

  return (
    <View className="mt-8">
      <View className="flex-row items-end justify-between">
        <Text className="text-[#d6a6ff] text-[30px] leading-[32px] font-extrabold">Racha</Text>

        <View className="flex-row items-center">
          <MaterialCommunityIcons name="fire" size={18} color="#d6a6ff" />
          <Text className="ml-2 text-[#d6a6ff] text-[19px] leading-6 font-extrabold">
            4 DÍAS SEGUIDOS
          </Text>
        </View>
      </View>

      <View className="mt-5 flex-row items-start justify-between">
        {dayItems.map((item, index) => (
          <FitnessDayPill
            key={`${item.day}-${index}`}
            day={item.day}
            dateNum={item.dateNum}
            active={selectedDay === index}
            onPress={() => setSelectedDay(index)}
          />
        ))}
      </View>
    </View>
  )
}