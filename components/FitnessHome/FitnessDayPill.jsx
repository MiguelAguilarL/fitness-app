import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function FitnessDayPill({ day = 'L', dateNum = '', active = false, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View className="items-center justify-end">
        <View
          style={{
            width: active ? 64 : 58,
            height: active ? 86 : 70,
            borderRadius: active ? 20 : 16,
            backgroundColor: active ? '#d6a6ff' : '#0f1220',
            borderWidth: active ? 0 : 1,
            borderColor: 'rgba(185,169,204,0.24)',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: active ? '#d6a6ff' : '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: active ? 0.34 : 0,
            shadowRadius: active ? 12 : 0,
            elevation: active ? 8 : 0,
          }}
        >
          <Text style={{ color: active ? '#2a0b3d' : '#b9a9cc', fontSize: 13, fontWeight: '700' }}>
            {day}
          </Text>

          {active ? (
            <Text style={{ color: '#2a0b3d', fontSize: 22, fontWeight: '900', marginTop: 4 }}>
              {dateNum}
            </Text>
          ) : null}
        </View>

        {!active ? <View className="mt-3 h-2 w-2 rounded-full bg-[#b9a9cc]" /> : null}
      </View>
    </TouchableOpacity>
  )
}