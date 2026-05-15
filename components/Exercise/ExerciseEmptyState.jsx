import React from 'react';
import { Text, View } from 'react-native';

export default function ExerciseEmptyState({ title, description }) {
  return (
    <View className="mt-6 rounded-[26px] border border-white/6 bg-[#17171b] px-5 py-6">
      <Text className="text-[18px] font-bold text-white">{title}</Text>
      <Text className="mt-2 text-[14px] leading-6 text-[#8f86a5]">{description}</Text>
    </View>
  );
}