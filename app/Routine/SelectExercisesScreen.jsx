import React, { useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFeaturedExercises, searchExercises } from '../../utils/api'

export default function SelectExercisesScreen() {
  const nav = useNavigation()
  const [selected, setSelected] = useState(new Set())
  const [selectedById, setSelectedById] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedCount = selected.size

  const canSubmit = selectedCount > 0

  const selectedExercises = useMemo(() => {
    return Object.values(selectedById)
  }, [selectedById])

  const toggle = (exercise) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(exercise.id)) {
        next.delete(exercise.id)
      } else {
        next.add(exercise.id)
      }
      return next
    })

    setSelectedById((prev) => {
      if (prev[exercise.id]) {
        const next = { ...prev }
        delete next[exercise.id]
        return next
      }

      return {
        ...prev,
        [exercise.id]: {
          id: exercise.id,
          name: exercise.name,
          imageUrl: exercise.imageUrl ?? null,
          videoUrl: exercise.videoUrl ?? null,
          instructions: Array.isArray(exercise.instructions) ? exercise.instructions : [],
          bodyParts: Array.isArray(exercise.bodyParts) ? exercise.bodyParts : [],
          targetMuscles: Array.isArray(exercise.targetMuscles) ? exercise.targetMuscles : [],
          secondaryMuscles: Array.isArray(exercise.secondaryMuscles) ? exercise.secondaryMuscles : [],
          equipments: Array.isArray(exercise.equipments) ? exercise.equipments : [],
          keywords: Array.isArray(exercise.keywords) ? exercise.keywords : [],
          exerciseType: String(exercise.exerciseType ?? '').trim(),
          overview: String(exercise.overview ?? '').trim(),
          sourceUrl: String(exercise.sourceUrl ?? '').trim() || null,
        },
      }
    })
  }

  const handleAgregar = () => {
    if (!canSubmit) {
      return
    }

    nav.navigate('CreateRoutine', { selectedExercises })
  }

  const runSearch = async () => {
    const normalizedQuery = searchQuery.trim()

    if (!normalizedQuery) {
      try {
        const featured = await getFeaturedExercises()
        setResults(Array.isArray(featured) ? featured : [])
      } catch (err) {
        setResults([])
      }
      setError('')
      return
    }

    setLoading(true)
    setError('')

    try {
      const items = await searchExercises(normalizedQuery)
      setResults(Array.isArray(items) ? items : [])

      if (!items?.length) {
        setError('No encontramos ejercicios para esa consulta.')
      }
    } catch (searchError) {
      setResults([])
      setError(searchError?.message || 'No se pudo buscar ejercicios. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    let mounted = true

    const loadFeatured = async () => {
      try {
        const items = await getFeaturedExercises()
        if (mounted) setResults(Array.isArray(items) ? items : [])
      } catch (err) {
        if (mounted) setResults([])
      }
    }

    loadFeatured()

    return () => {
      mounted = false
    }
  }, [])

  const renderItem = ({ item }) => {
    const isSelected = selected.has(item.id)
    const subtitle = [item.equipments?.[0], item.overview].filter(Boolean).join(' • ')

    return (
      <TouchableOpacity
        onPress={() => toggle(item)}
        className={`flex-row items-center p-3 rounded-lg my-2 ${
          isSelected ? 'bg-[#0f1220] border border-white/6' : 'bg-transparent'
        }`}
      >
        <View className="w-14 h-14 bg-[#17171b] rounded-md items-center justify-center mr-3 overflow-hidden">
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <Text className="text-xs text-[#a9a9b8]">IMG</Text>
          )}
        </View>

        <View className="flex-1">
          <Text className="text-white font-semibold text-base">{item.name}</Text>
          {!!subtitle && (
            <Text numberOfLines={2} className="text-[#a9a9b8] text-xs mt-1">
              {subtitle}
            </Text>
          )}
        </View>

        <View className="ml-3">
          {isSelected ? (
            <Feather name="check-circle" size={22} color="#d6a6ff" />
          ) : (
            <Feather name="circle" size={22} color="#3f3f46" />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/6">
        <TouchableOpacity onPress={() => nav.goBack()} className="p-2">
          <Feather name="arrow-left" size={22} color="#ffffff" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-bold">Seleccionar ejercicios</Text>

        <TouchableOpacity onPress={handleAgregar} className="p-2" disabled={!canSubmit}>
          <View className="flex-row items-center">
            <Feather name="check" size={18} color={canSubmit ? '#d6a6ff' : '#6b7280'} />
            <Text className={`font-semibold ml-2 ${canSubmit ? 'text-[#d6a6ff]' : 'text-[#6b7280]'}`}>
              Agregar {canSubmit ? `(${selectedCount})` : ''}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="px-4 pt-4 pb-2 border-b border-white/6">
        <View className="flex-row items-center rounded-xl bg-[#0f1220] border border-white/10 px-3 py-2">
          <Feather name="search" size={18} color="#a9a9b8" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={runSearch}
            returnKeyType="search"
            placeholder="Buscar por palabra clave o equipo"
            placeholderTextColor="#6b7280"
            className="flex-1 text-white ml-2"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={async () => {
                setSearchQuery('')
                try {
                  const featured = await getFeaturedExercises()
                  setResults(Array.isArray(featured) ? featured : [])
                } catch (err) {
                  setResults([])
                }
                setError('')
              }}
              className="p-1"
            >
              <Feather name="x-circle" size={18} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={runSearch}
          disabled={loading}
          className="mt-3 rounded-full bg-[#d6a6ff]/20 border border-[#d6a6ff]/30 py-2.5"
        >
          {loading ? (
            <ActivityIndicator color="#d6a6ff" />
          ) : (
            <Text className="text-center text-[#d6a6ff] font-semibold">Buscar</Text>
          )}
        </TouchableOpacity>

        {!!error && <Text className="text-[#ff8f8f] text-sm mt-3">{error}</Text>}
      </View>

      <FlatList
        data={results}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        renderItem={renderItem}
        ListEmptyComponent={
          !loading ? (
            <View className="py-16 items-center justify-center">
              <Text className="text-[#a9a9b8] text-center">
                {searchQuery.trim()
                  ? 'No hay resultados. Prueba con otra palabra clave o equipo.'
                  : 'Se muestran ejercicios desde la API (hasta ~10). Busca por palabra clave o equipo.'}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  )
}
