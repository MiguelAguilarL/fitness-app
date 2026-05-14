import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Pressable, TextInput, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { saveRoutine, generateRoutineId } from '../../utils/routinesStorage'

export default function CreateRoutineScreen({ navigation, route }) {
  const [routineName, setRoutineName] = useState('')
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(false)

  const removeExercise = (id) => {
    setExercises((current) => current.filter((exercise) => exercise.id !== id))
  }

  const updateExercise = (id, field, value) => {
    setExercises((current) =>
      current.map((exercise) => (exercise.id === id ? { ...exercise, [field]: value } : exercise)),
    )
  }

  const handleSave = async () => {
    if (!routineName.trim()) {
      Alert.alert('Error', 'Ingresa el nombre de la rutina')
      return
    }

    if (exercises.length === 0) {
      Alert.alert('Error', 'Agrega al menos un ejercicio')
      return
    }

    const normalizedExercises = exercises.map((exercise) => ({
      ...exercise,
      sets: Number(exercise.sets) || 3,
      reps: Number(exercise.reps) || 10,
    }))

    const newRoutine = {
      id: generateRoutineId(),
      title: routineName.trim(),
      description: '',
      difficulty: 'intermedio',
      duration: 30,
      exercises: normalizedExercises,
      isPredefined: false,
      createdAt: new Date().toISOString(),
    }

    setLoading(true)
    try {
      await saveRoutine(newRoutine)
      Alert.alert('Éxito', 'Rutina creada correctamente', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ])
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la rutina')
      console.error('Error saving routine:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const selected = route?.params?.selectedExercises
    if (selected && Array.isArray(selected) && selected.length > 0) {
      const mapped = selected.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        sets: 3,
        reps: 10,
      }))

      setExercises((current) => {
        const existingIds = new Set(current.map((exercise) => exercise.id))
        const toAdd = mapped.filter((exercise) => !existingIds.has(exercise.id))
        return [...current, ...toAdd]
      })

      navigation.setParams({ selectedExercises: undefined })
    }
  }, [navigation, route?.params?.selectedExercises])

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <View className="flex-row items-center justify-between px-4 pt-6 pb-4 border-b border-white/6">
        <Pressable onPress={() => navigation.goBack()} className="p-2">
          <Feather name="arrow-left" size={22} color="white" />
        </Pressable>

        <Text className="text-2xl font-bold text-white">Crear Rutina</Text>

        <Pressable onPress={handleSave} className="p-2" disabled={loading}>
          <Feather name="check" size={22} color="#d6a6ff" />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="mt-6 mb-8">
          <TextInput
            placeholder="Título de la Rutina"
            placeholderTextColor="#6b7280"
            value={routineName}
            onChangeText={setRoutineName}
            className="border-b border-white/10 pb-4 pt-2 text-2xl font-semibold text-white"
          />
        </View>

        <View className="mb-6">
          <Text className="text-[#a9a9b8] text-base mb-6">Agrega ejercicios a tu rutina</Text>

          {exercises.length === 0 ? (
            <View className="items-center justify-center py-16 rounded-[18px] border border-white/6 bg-[#0f1220]">
              <Feather name="activity" size={64} color="#6b7280" style={{ marginBottom: 24 }} />

              <Pressable
                onPress={() => navigation.navigate('SelectExercises')}
                className="rounded-full px-5 py-4 border border-[#d6a6ff]/20 bg-[#d6a6ff]/10"
              >
                <Text className="text-center text-[#d6a6ff] text-base font-semibold">
                  + Agregar ejercicio
                </Text>
              </Pressable>
            </View>
          ) : (
            <View className="gap-3">
              {exercises.map((exercise) => (
                <View
                  key={exercise.id}
                  className="rounded-[18px] border border-white/6 bg-[#0f1220] p-4"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1 pr-3">
                      <Text className="text-base font-semibold text-white">{exercise.name}</Text>
                      <Text className="text-xs text-[#a9a9b8] mt-1">Ajusta series y repeticiones</Text>
                    </View>

                    <Pressable onPress={() => removeExercise(exercise.id)} className="p-2">
                      <Feather name="trash-2" size={18} color="#ff6b6b" />
                    </Pressable>
                  </View>

                  <View className="flex-row gap-3">
                    <View className="flex-1">
                      <Text className="text-xs font-semibold text-[#a9a9b8] mb-2">Series</Text>
                      <TextInput
                        value={String(exercise.sets)}
                        onChangeText={(value) => updateExercise(exercise.id, 'sets', value)}
                        keyboardType="number-pad"
                        className="rounded-[12px] border border-white/6 bg-[#17171b] px-4 py-3 text-white"
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="text-xs font-semibold text-[#a9a9b8] mb-2">Reps</Text>
                      <TextInput
                        value={String(exercise.reps)}
                        onChangeText={(value) => updateExercise(exercise.id, 'reps', value)}
                        keyboardType="number-pad"
                        className="rounded-[12px] border border-white/6 bg-[#17171b] px-4 py-3 text-white"
                      />
                    </View>
                  </View>
                </View>
              ))}

              <Pressable
                onPress={() => navigation.navigate('SelectExercises')}
                className="mt-2 rounded-full py-3 border border-[#d6a6ff]/20 bg-[#d6a6ff]/10"
              >
                <Text className="text-center text-[#d6a6ff] text-base font-semibold">
                  + Agregar ejercicio
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
