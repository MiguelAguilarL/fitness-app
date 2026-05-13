import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ExerciseCard({ item, onPress }) {
  const normalizedGifUrl = /^http:\/\//i.test(String(item?.gifUrl ?? '').trim())
    ? String(item.gifUrl).replace(/^http:\/\//i, 'https://')
    : String(item?.gifUrl ?? '').trim();
  const imageSource = normalizedGifUrl ? { uri: normalizedGifUrl } : null;
  const title = item?.name ?? 'Ejercicio';
  const subtitle = [item?.bodyPart, item?.target].filter(Boolean).join(' · ') || 'Sin categoría';
  const equipment = item?.equipment ?? 'Sin equipo';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View className="overflow-hidden rounded-[26px] border border-white/6 bg-[#17171b]">
      <View className="flex-row">
        <View className="h-[180px] w-[34%] overflow-hidden bg-[#120f1c]">
          {imageSource ? (
            <>
            <Image source={imageSource} className="h-full w-full" resizeMode="cover" />
              <View className="absolute inset-0 bg-[#150a27]/65" />
            </>
          ) : (
            <View className="flex-1 items-center justify-center bg-[#120f1c]">
              <MaterialCommunityIcons name="dumbbell" size={34} color="#a74cff" />
            </View>
          )}
        </View>

        <View className="flex-1 px-4 py-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[20px] font-black text-white">{title}</Text>
              <Text className="mt-1 text-[15px] text-[#8f86a5]">{subtitle}</Text>
            </View>

            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#23232a]">
              <Feather name="arrow-up-right" size={20} color="#62667a" />
            </View>
          </View>

          <View className="mt-5 flex-row flex-wrap gap-2.5">
            <View className="rounded-full bg-[#3c284f] px-4 py-2.5">
              <Text className="text-[14px] font-black text-[#d292ff]">{item?.target ?? 'target'}</Text>
            </View>
            <View className="rounded-full bg-[#3c284f] px-4 py-2.5">
              <Text className="text-[14px] font-black text-[#d292ff]">{equipment}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}