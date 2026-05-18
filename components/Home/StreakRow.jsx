import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import DayPill from './DayPill'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function StreakRow() {
  const [selectedDay, setSelectedDay] = useState(0)

  // Day letters: L (Lunes), M (Martes), M (Miércoles), J (Jueves), V (Viernes), S (Sábado), D (Domingo)
  const dayLetters = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

  // Generate the current week's days
  const getCurrentWeek = () => {
    const today = new Date()
    const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // Adjust to Monday as start (0 = Monday, 6 = Sunday)
    const mondayOffset = currentDay === 0 ? 6 : currentDay - 1
    const monday = new Date(today)
    monday.setDate(today.getDate() - mondayOffset)

    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      const daysSinceToday = Math.floor((today - date) / (1000 * 60 * 60 * 24))
      const hasWorkout = daysSinceToday >= 0 && daysSinceToday <= 3
      days.push({
        day: dayLetters[i],
        dateNum: date.getDate().toString(),
        fullDate: date,
        hasWorkout,
      })
    }
    return days
  }

  const days = getCurrentWeek()

  useEffect(() => {
    // Set selectedDay to today's index
    const today = new Date()
    const currentDay = today.getDay()
    const mondayOffset = currentDay === 0 ? 6 : currentDay - 1
    setSelectedDay(mondayOffset)
  }, [])

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

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}>
        {days.map((item, index) => (
          <DayPill
            key={index}
            day={item.day}
            dateNum={item.dateNum}
            active={selectedDay === index}
            hasWorkout={item.hasWorkout}
          />
        ))}
      </View>

    </View>
  )
}
