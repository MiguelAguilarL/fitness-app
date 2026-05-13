import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

function FilterChip({ label, selected, onPress, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`rounded-full border px-4 py-2.5 ${selected ? 'border-[#d6a6ff] bg-[#3c284f]' : 'border-white/10 bg-[#17171b]'} ${disabled ? 'opacity-60' : ''}`}
    >
      <Text className={`text-[13px] font-semibold ${selected ? 'text-[#f1d3ff]' : 'text-[#c7c3d5]'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function ExerciseFiltersSection({
  sections,
  selectedFilter,
  onSelectFilter,
  onResetFilters,
  loading = false,
}) {
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-[18px] font-extrabold text-white">Filtros</Text>
        <Pressable onPress={onResetFilters} disabled={loading}>
          <Text className="text-[13px] font-semibold text-[#d6a6ff]">Limpiar</Text>
        </Pressable>
      </View>

      <Text className="mt-1 text-[13px] text-[#8f86a5]">
        Explora ejercicios por equipo, parte del cuerpo o músculo objetivo.
      </Text>

      {sections.map((section) => (
        <View key={section.key} className="mt-4">
          <Text className="mb-2 text-[13px] font-bold uppercase tracking-[1.2px] text-[#8f86a5]">
            {section.title}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 12 }}>
            {section.options.map((option) => {
              const isSelected =
                selectedFilter?.type === option.type && selectedFilter?.value === option.value;

              return (
                <FilterChip
                  key={`${section.key}:${option.value}`}
                  label={option.label}
                  selected={isSelected}
                  disabled={loading}
                  onPress={() => onSelectFilter(option)}
                />
              );
            })}
          </ScrollView>
        </View>
      ))}
    </View>
  );
}
