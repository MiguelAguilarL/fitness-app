import React from 'react';
import { Text, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ExerciseDetailInfo({ exercise }) {
  return (
    <View className="px-6 py-6">
      {/* Nombre del Ejercicio */}
      <Text className="text-3xl font-black text-white">{exercise?.name ?? 'Ejercicio'}</Text>

      {/* Información Principal */}
      <View className="mt-4 space-y-3">
        <View className="flex-row items-start gap-3">
          <View className="mt-1 h-5 w-5 items-center justify-center rounded-full bg-[#d6a6ff]/20">
            <Feather name="target" size={12} color="#d6a6ff" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-[#8f86a5]">Músculos trabajados</Text>
            <Text className="mt-1 text-base font-medium text-white">
              {[exercise?.bodyPart, exercise?.target].filter(Boolean).join(' · ') || 'Sin información'}
            </Text>
          </View>
        </View>

        <View className="flex-row items-start gap-3">
          <View className="mt-1 h-5 w-5 items-center justify-center rounded-full bg-[#d6a6ff]/20">
            <MaterialCommunityIcons name="dumbbell" size={12} color="#d6a6ff" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-[#8f86a5]">Equipamiento</Text>
            <Text className="mt-1 text-base font-medium text-white">
              {exercise?.equipment ? exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1) : 'Sin equipo'}
            </Text>
          </View>
        </View>

        {exercise?.bodyPart && (
          <View className="flex-row items-start gap-3">
            <View className="mt-1 h-5 w-5 items-center justify-center rounded-full bg-[#d6a6ff]/20">
              <MaterialCommunityIcons name="human-male" size={12} color="#d6a6ff" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-[#8f86a5]">Parte del cuerpo</Text>
              <Text className="mt-1 text-base font-medium text-white">
                {exercise.bodyPart.charAt(0).toUpperCase() + exercise.bodyPart.slice(1)}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Tags */}
      <View className="mt-6 flex-row flex-wrap gap-3">
        {exercise?.target && (
          <View className="rounded-full bg-[#3c284f] px-4 py-2.5">
            <Text className="text-sm font-bold text-[#d292ff]">{exercise.target}</Text>
          </View>
        )}
        {exercise?.equipment && (
          <View className="rounded-full bg-[#3c284f] px-4 py-2.5">
            <Text className="text-sm font-bold text-[#d292ff]">{exercise.equipment}</Text>
          </View>
        )}
        {exercise?.bodyPart && (
          <View className="rounded-full bg-[#3c284f] px-4 py-2.5">
            <Text className="text-sm font-bold text-[#d292ff]">{exercise.bodyPart}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
