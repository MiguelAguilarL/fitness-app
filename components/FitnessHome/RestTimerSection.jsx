import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function RestTimerSection({ label, onSkipRest, progress = 1, disabled = false }) {
  const progressWidth = `${Math.max(0, Math.min(1, progress)) * 100}%`
  const mutedContainerClassName = disabled
    ? 'border-white/5 bg-[#101017] opacity-55'
    : 'border-[#22192f] bg-[#111119]'
  const titleClassName = disabled ? 'text-[24px] font-semibold text-[#545a6d]' : 'text-[24px] font-semibold text-[#666d80]'
  const timerClassName = disabled ? 'text-[42px] font-black text-[#5b496f]' : 'text-[50px] font-black text-[#8f46ff]'
  const progressTrackClassName = disabled ? 'bg-[#1b1722]' : 'bg-[#22192f]'
  const progressFillClassName = disabled ? 'bg-[#8f46ff]/35' : 'bg-[#8f46ff]'
  const buttonClassName = disabled
    ? 'border border-white/6 bg-white/4'
    : 'border-2 border-[#8f46ff] bg-[#8f46ff]/15'
  const buttonTextClassName = disabled ? 'text-[22px] font-bold text-white/30' : 'text-[24px] font-bold text-[#8f46ff]'

  return (
    <View className={`mt-10 overflow-hidden rounded-[32px] px-5 py-6 ${mutedContainerClassName}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Feather name="clock" size={24} color={disabled ? '#43485b' : '#545a6d'} />
          <Text className={titleClassName}>Descanso</Text>
        </View>

        <Text className={timerClassName}>{label}</Text>
      </View>

      <View className={`mt-8 h-3 overflow-hidden rounded-full ${progressTrackClassName}`}>
        <View className={`h-full rounded-full ${progressFillClassName}`} style={{ width: progressWidth }} />
      </View>

      <Pressable
        onPress={onSkipRest}
        disabled={disabled}
        className={`mt-8 items-center justify-center rounded-full py-5 ${buttonClassName}`}
        style={({ pressed }) => [{ opacity: pressed && !disabled ? 0.85 : 1 }]}
      >
        <Text className={buttonTextClassName}>Saltar Descanso</Text>
      </Pressable>
    </View>
  )
}