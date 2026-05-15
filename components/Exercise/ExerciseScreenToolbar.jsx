import React from 'react';
import { Text, View } from 'react-native';
import ExerciseSearchSection from './ExerciseSearchSection';
import ExerciseFiltersSection from './ExerciseFiltersSection';

export default function ExerciseScreenToolbar({
  searchQuery,
  onChangeSearchQuery,
  onSubmitSearch,
  onClearSearch,
  selectedFilter,
  filterSections,
  onSelectFilter,
  onResetFilters,
  loadingFilters,
  onClearCache,
  error,
}) {
  return (
    <View>
      <ExerciseSearchSection
        query={searchQuery}
        onChangeQuery={onChangeSearchQuery}
        onSubmitSearch={onSubmitSearch}
        onClearQuery={onClearSearch}
      />

      <ExerciseFiltersSection
        sections={filterSections}
        selectedFilter={selectedFilter}
        onSelectFilter={onSelectFilter}
        onResetFilters={onResetFilters}
        loading={loadingFilters}
      />

      <View className="mt-3 flex-row justify-end">
        <Text onPress={onClearCache} className="rounded-full bg-[#1f1b2a] px-4 py-2 text-[12px] font-semibold text-[#d6a6ff]">
          Limpiar caché
        </Text>
      </View>

      {error ? (
        <View className="mt-4">
          <Text className="rounded-[20px] border border-[#d6a6ff]/20 bg-[#140f1f] px-4 py-3 text-[13px] leading-5 text-[#f1d3ff]">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
}