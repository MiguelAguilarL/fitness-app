import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import {
  EXERCISE_DB_DEFAULT_CONFIG,
  clearExerciseCache,
  getExercisesForUserProfile,
  searchExercises,
} from '../utils/api';
import ExerciseCard from '../components/Exercise/ExerciseCard';
import ExerciseEmptyState from '../components/Exercise/ExerciseEmptyState';
import ExerciseFiltersSection from '../components/Exercise/ExerciseFiltersSection';
import ExerciseScreenHeader from '../components/Exercise/ExerciseScreenHeader';

function getProfileLabel(profile) {
  if (!profile) {
    return 'Perfil no disponible';
  }

  const pieces = [
    profile.recommendedSplit?.label ?? profile.recommendedSplit,
    profile.goal?.label ?? profile.goal,
    profile.focusArea?.label ?? profile.focusArea,
  ].filter(Boolean);

  if (!pieces.length) {
    return 'Entrenamiento personalizado';
  }

  return pieces.join(' · ');
}

export default function ExerciseScreen({ navigation }) {
  const { profile } = useQuestionnaire();
  const [initialExercises, setInitialExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [error, setError] = useState('');
  const [activeMode, setActiveMode] = useState('profile');

  const config = EXERCISE_DB_DEFAULT_CONFIG;

  const visibleExercises = activeMode === 'filter' ? filteredExercises : initialExercises;
  const profileLabel = useMemo(() => getProfileLabel(profile), [profile]);

  const titleCase = (value) => String(value ?? '').replace(/\b\w/g, (char) => char.toUpperCase());

  const uniqueOptions = (items, key, fallback = []) => {
    const dynamicValues = Array.from(
      new Set(
        items
          .map((item) => item?.[key])
          .filter(Boolean)
          .map((entry) => String(entry).trim())
      )
    );

    const merged = dynamicValues.length ? dynamicValues : fallback;
    return merged.slice(0, 10).map((value) => ({
      type: key,
      value,
      label: titleCase(value),
    }));
  };

  const filterSections = useMemo(() => {
    return [
      {
        key: 'equipment',
        title: 'Equipo',
        options: uniqueOptions(initialExercises, 'equipment', [
          'body weight',
          'dumbbell',
          'barbell',
          'cable',
          'kettlebell',
        ]),
      },
      {
        key: 'bodyPart',
        title: 'Parte del cuerpo',
        options: uniqueOptions(initialExercises, 'bodyPart', [
          'back',
          'chest',
          'upper legs',
          'shoulders',
          'waist',
        ]),
      },
      {
        key: 'target',
        title: 'Músculo objetivo',
        options: uniqueOptions(initialExercises, 'target', [
          'biceps',
          'triceps',
          'quadriceps',
          'abs',
          'glutes',
        ]),
      },
    ];
  }, [initialExercises]);

  const loadInitialExercises = async () => {
    setLoadingInitial(true);
    setError('');

    try {
      const exercises = await getExercisesForUserProfile(profile, config);
      setInitialExercises(exercises);
      setActiveMode('profile');
    } catch (exception) {
      setError(exception?.message || 'No se pudo cargar la lista inicial. Agrega tu API key y host de exerciseDB.');
      setInitialExercises([]);
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setLoadingInitial(true);
      setError('');

      try {
        const exercises = await getExercisesForUserProfile(profile, config);

        if (!mounted) {
          return;
        }

        setInitialExercises(exercises);
        setActiveMode('profile');
      } catch (exception) {
        if (!mounted) {
          return;
        }

        setError(exception?.message || 'No se pudo cargar la lista inicial. Agrega tu API key y host de exerciseDB.');
        setInitialExercises([]);
      } finally {
        if (mounted) {
          setLoadingInitial(false);
        }
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [config, profile]);

  const handleClearCache = async () => {
    setLoadingFilter(true);
    setError('');

    try {
      await clearExerciseCache();
      setSelectedFilter(null);
      setFilteredExercises([]);
      setInitialExercises([]);
      await loadInitialExercises();
    } catch (exception) {
      setError(exception?.message || 'No se pudo limpiar la caché.');
    } finally {
      setLoadingFilter(false);
    }
  };

  const handleFilterSelect = async (filterOption) => {
    if (!filterOption?.value) {
      setActiveMode('profile');
      setFilteredExercises([]);
      setSelectedFilter(null);
      setError('');
      return;
    }

    const isAlreadySelected =
      selectedFilter?.type === filterOption.type && selectedFilter?.value === filterOption.value;

    if (isAlreadySelected) {
      setActiveMode('profile');
      setFilteredExercises([]);
      setSelectedFilter(null);
      setError('');
      return;
    }

    setLoadingFilter(true);
    setError('');
    setSelectedFilter(filterOption);

    try {
      const exercises = await searchExercises(filterOption.value, config);
      setFilteredExercises(exercises);
      setActiveMode('filter');

      if (!exercises.length) {
        setError('No encontramos ejercicios para ese filtro. Prueba una opción distinta.');
      }
    } catch (exception) {
      setError(exception?.message || 'No se pudo aplicar el filtro. Revisa tus credenciales o tu conexión.');
      setFilteredExercises([]);
      setActiveMode('filter');
    } finally {
      setLoadingFilter(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedFilter(null);
    setFilteredExercises([]);
    setActiveMode('profile');
    setError('');
  };

  const handleExercisePress = (exercise) => {
    navigation.navigate('ExerciseDetail', { exercise });
  };

  const renderItem = ({ item }) => (
    <ExerciseCard item={item} onPress={() => handleExercisePress(item)} />
  );
  const isLoading = loadingInitial || loadingFilter;
  const title = activeMode === 'filter' ? 'Resultados filtrados' : 'Ejercicios para ti';
  const subtitle = activeMode === 'filter'
    ? `Filtro activo: ${selectedFilter?.label ?? 'Ninguno'}`
    : profileLabel;

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <StatusBar barStyle="light-content" backgroundColor="#07060a" />

      <View className="absolute inset-0 bg-[#07060a]" />
      <View className="absolute -top-20 left-0 h-52 w-52 rounded-full bg-[#25143f] opacity-30" />
      <View className="absolute right-0 top-24 h-56 w-56 rounded-full bg-[#1b2447] opacity-22" />

      <FlatList
        data={visibleExercises}
        keyExtractor={(item, index) => String(item?.id ?? item?.name ?? index)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 12, paddingBottom: 36 }}
        ListHeaderComponent={
          <View>
            <ExerciseScreenHeader title={title} subtitle={subtitle} />

            <ExerciseFiltersSection
              sections={filterSections}
              selectedFilter={selectedFilter}
              onSelectFilter={handleFilterSelect}
              onResetFilters={handleClearFilters}
              loading={loadingFilter}
            />

            <View className="mt-3 flex-row justify-end">
              <Text onPress={handleClearCache} className="rounded-full bg-[#1f1b2a] px-4 py-2 text-[12px] font-semibold text-[#d6a6ff]">
                Limpiar caché
              </Text>
            </View>

            {error ? (
              <ExerciseEmptyState title="Aviso" description={error} />
            ) : null}

            <View className="mt-6 flex-row items-center justify-between">
              <View>
                <Text className="text-[18px] font-extrabold text-white">Lista</Text>
                <Text className="mt-1 text-[13px] text-[#8f86a5]">
                  {visibleExercises.length} ejercicios {activeMode === 'filter' ? 'filtrados' : 'recomendados'}
                </Text>
              </View>
              {isLoading ? (
                <View className="flex-row items-center gap-2">
                  <ActivityIndicator color="#d6a6ff" />
                  <Text className="text-[13px] text-[#8f86a5]">Cargando</Text>
                </View>
              ) : null}
            </View>
          </View>
        }
        ListEmptyComponent={
          !isLoading ? (
            <ExerciseEmptyState
              title="Sin resultados por ahora"
              description="No se encontraron ejercicios para tus objetivos o filtros actuales. Prueba otro filtro para explorar más opciones."
            />
          ) : null
        }
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </SafeAreaView>
  );
}
