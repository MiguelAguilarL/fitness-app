import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ExerciseDetailHeader({ onGoBack }) {
  return (
    <View className="flex-row items-center justify-between px-6 py-4">
      <TouchableOpacity
        onPress={onGoBack}
        className="h-10 w-10 items-center justify-center rounded-full bg-[#23232a]"
      >
        <Feather name="chevron-left" size={24} color="#d6a6ff" />
      </TouchableOpacity>
      <Text className="flex-1 ml-4 text-xl font-bold text-white">Detalle del Ejercicio</Text>
      <View className="w-10" />
    </View>
  );
}
