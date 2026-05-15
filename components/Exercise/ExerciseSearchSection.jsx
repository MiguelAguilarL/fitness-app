import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function ExerciseSearchSection({ query, onChangeQuery, onSubmitSearch, onClearQuery }) {
  return (
    <View className="mt-6 rounded-[28px] border border-white/6 bg-[#101018] px-4 py-4">
      <Text className="text-[12px] font-bold uppercase tracking-[2px] text-[#8f86a5]">Buscar ejercicios</Text>

      <View className="mt-3 flex-row items-center rounded-[20px] bg-[#17171f] px-4 py-3">
        <Feather name="search" size={18} color="#8f86a5" />
        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          onSubmitEditing={onSubmitSearch}
          placeholder="Ej: Espalda, Pecho, Piernas"
          placeholderTextColor="#6d647f"
          className="ml-3 flex-1 text-[16px] text-white"
          returnKeyType="search"
        />

        {query.length > 0 ? (
          <Pressable onPress={onClearQuery}>
            <Feather name="x" size={18} color="#8f86a5" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}