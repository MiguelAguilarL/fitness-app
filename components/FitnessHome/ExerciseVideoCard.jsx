import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { VideoView, useVideoPlayer } from 'expo-video'

export default function ExerciseVideoCard({ image, videoUrl }) {
  const normalizedVideoUrl = String(videoUrl ?? '').trim()
  const player = useVideoPlayer(normalizedVideoUrl || null)

  useEffect(() => {
    if (!normalizedVideoUrl || !player) return

    try {
      player.loop = true
      if (typeof player.play === 'function') {
        player.play()
      }
    } catch (e) {
      // ignore playback setup errors
      console.warn('Video player setup error', e)
    }
  }, [normalizedVideoUrl, player])

  return (
    <View className="mt-8 overflow-hidden rounded-[30px] border border-[#2b2146] bg-[#15141b] p-3 shadow-black/30">
      <View className="overflow-hidden rounded-[24px]">
        {normalizedVideoUrl ? (
          <View className="h-[220px] w-full">
            <VideoView
              player={player}
              nativeControls
              contentFit="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        ) : (
          <View className="h-[220px] w-full items-center justify-center rounded-[24px] bg-[#0f1220] px-6">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-[#8f46ff] shadow-black/30">
              <Feather name="play" size={36} color="#ffffff" style={{ marginLeft: 5 }} />
            </View>

            <Text className="mt-4 text-center text-sm text-[#a9a9b8]">
              No hay video disponible para este ejercicio.
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}