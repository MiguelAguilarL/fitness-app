import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DayPill from './DayPill'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function StreakRow() {
  const [selectedDay, setSelectedDay] = useState(3)

  const days = [
    { day: 'L', dateNum: '' },
    { day: 'M', dateNum: '' },
    { day: 'M', dateNum: '' },
    { day: 'J', dateNum: '24' },
    { day: 'V', dateNum: '' },
    { day: 'S', dateNum: '' },
    { day: 'D', dateNum: '' },
  ]

  return (
    <View style={{ marginTop: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <Text style={{ color: '#d6a6ff', fontSize: 26, fontWeight: '800' }}>Racha</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="fire" size={16} color="#d6a6ff" />
          <Text style={{ color: '#d6a6ff', fontWeight: '800', fontSize: 17, marginLeft: 4 }}>
            4 DÍAS SEGUIDOS
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {days.map((item, index) => (
          <DayPill
            key={index}
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
