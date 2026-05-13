import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const QUICK_SEARCHES = ['Espalda', 'Pecho', 'Piernas', 'Hombros', 'Bíceps', 'Abdominales'];

export default function ExerciseSearchSection({ query, onChangeQuery, onSubmitSearch, onClearQuery, onQuickSearch }) {
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
        <View className="flex-row gap-2">
          {QUICK_SEARCHES.map((term) => (
            <Pressable
              key={term}
              onPress={() => onQuickSearch(term)}
              className="rounded-full bg-[#222230] px-4 py-2"
            >
              <Text className="text-[13px] font-semibold text-[#d6a6ff]">{term}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}