import React, { useEffect } from 'react'
import { ImageBackground, Text, View } from 'react-native'
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
          <ImageBackground source={{ uri: image }} className="h-[220px] w-full" imageStyle={{ resizeMode: 'cover' }}>
            <View className="absolute inset-0 bg-black/55" />
            <View className="absolute inset-0 bg-[#261040]/20" />

            <View className="flex-1 items-center justify-center">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-[#8f46ff] shadow-black/30">
                <Feather name="play" size={36} color="#ffffff" style={{ marginLeft: 5 }} />
              </View>
            </View>

            <View className="absolute bottom-3 right-3 rounded-full bg-black/25 px-3 py-1.5">
              <Text className="text-[13px] font-semibold tracking-[1.8px] text-white/60">SIN VIDEO</Text>
            </View>
          </ImageBackground>
        )}

        <View className="absolute bottom-3 right-3 rounded-full bg-black/25 px-3 py-1.5">
          <Text className="text-[13px] font-semibold tracking-[1.8px] text-white/60">
            {normalizedVideoUrl ? 'VIDEO' : 'TÉCNICA'}
          </Text>
          </View>
      </View>
    </View>
  )
}