import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function ExerciseScreenSummary({ title, subtitle, count, isLoading, label = 'ejercicios' }) {
  return (
    <View className="mt-6 flex-row items-center justify-between">
      <View>
        <Text className="text-[18px] font-extrabold text-white">{title}</Text>
        <Text className="mt-1 text-[13px] text-[#8f86a5]">
          {count} {label} {subtitle}
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-row items-center gap-2">
          <ActivityIndicator color="#d6a6ff" />
          <Text className="text-[13px] text-[#8f86a5]">Cargando</Text>
        </View>
      ) : null}
    </View>
  );
}