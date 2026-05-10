import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import ProgressBar from '../ProgressBar'

export default function TimerDisplay({ duration = 90, timeLeft: controlledTimeLeft, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(controlledTimeLeft ?? duration)

  useEffect(() => {
    if (typeof controlledTimeLeft === 'number') {
      setTimeLeft(controlledTimeLeft)
      return
    }

    setTimeLeft(duration)
  }, [duration, controlledTimeLeft])

  useEffect(() => {
    if (typeof controlledTimeLeft === 'number') {
      if (controlledTimeLeft <= 0) onFinish && onFinish()
      return
    }

    if (timeLeft <= 0) {
      onFinish && onFinish()
      return
    }

    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [timeLeft, controlledTimeLeft, onFinish])

  const minutes = String(Math.floor(timeLeft / 60))
  const seconds = String(timeLeft % 60).padStart(2, '0')
  const progress = duration > 0 ? (duration - Math.max(0, timeLeft)) / duration : 0

  return (
    <View className="mx-4 mt-6 rounded-[18px] bg-[#131218] px-6 py-5 shadow-black/30">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Text className="text-[18px] font-semibold text-white">⏱️ Descanso</Text>
        </View>

        <Text className="text-[32px] font-extrabold text-[#8f46ff]">{minutes}:{seconds}</Text>
      </View>

      <ProgressBar progress={progress} />
    </View>
  )
}
