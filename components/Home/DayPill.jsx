import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function DayPill({ day = 'L', dateNum = '24', active = false, onPress }) {
  const containerStyle = active
    ? {
        backgroundColor: '#d6a6ff',
        shadowColor: '#d6a6ff',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 8,
      }
    : { backgroundColor: '#0f1220' }

  const textStyle = active ? { color: '#2a0b3d' } : { color: '#b9a9cc' }

  if (active) {
    return (
      <TouchableOpacity style={{ alignItems: 'center', marginRight: 6 }} activeOpacity={0.9} onPress={onPress}>
        <View
          style={{
            ...containerStyle,
            width: 56,
            height: 72,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: textStyle.color, fontSize: 12, fontWeight: '700' }}>{day}</Text>
          <Text style={{ color: textStyle.color, fontSize: 18, fontWeight: '900', marginTop: 4 }}>{dateNum}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity style={{ alignItems: 'center', marginRight: 6 }} activeOpacity={0.9} onPress={onPress}>
      <View
        style={{
          width: 44,
          height: 56,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'rgba(185,169,204,0.25)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#b9a9cc', fontSize: 12, fontWeight: '700' }}>{day}</Text>
      </View>

      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#b9a9cc', marginTop: 6 }} />
    </TouchableOpacity>
  )
}
