import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ExerciseDetailActions({ onGoBack }) {
  return (
    <View className="px-6">
      <TouchableOpacity
        onPress={onGoBack}
        className="mt-8 mb-4 h-14 items-center justify-center rounded-2xl bg-[#d6a6ff]"
      >
        <Text className="text-lg font-bold text-[#07060a]">Volver</Text>
      </TouchableOpacity>
    </View>
  );
}