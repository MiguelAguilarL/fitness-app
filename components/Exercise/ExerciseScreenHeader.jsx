import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ExerciseScreenHeader({ title, subtitle }) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1 pr-4">
        <Text className="text-[13px] font-bold uppercase tracking-[3px] text-[#8f86a5]">ExerciseDB</Text>
        <Text className="mt-2 text-[32px] font-black text-white">{title}</Text>
        <Text className="mt-2 text-[15px] leading-6 text-[#8f86a5]">{subtitle}</Text>
      </View>

      <View className="h-14 w-14 items-center justify-center rounded-full bg-[#d6a6ff]">
        <Feather name="search" size={22} color="#4d1595" />
      </View>
    </View>
  );
}