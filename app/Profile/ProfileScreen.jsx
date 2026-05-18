import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import ProgressBar from '../../components/ProgressBar'
import { loadUserProfile, saveUserProfile } from '../../utils/userProfileStorage'

const quickStats = [
  { label: 'Entrenamientos', value: '128', icon: 'repeat' },
  { label: 'Calorías', value: '82.3k', icon: 'fire' },
  { label: 'Consistencia', value: '89%', icon: 'clock' },
  { label: 'Logros', value: '14', icon: 'award' },
]

const weeklyHours = [
  { id: 'lunes', day: 'L', hours: 10 },
  { id: 'martes', day: 'M', hours: 24 },
  { id: 'miercoles', day: 'M', hours: 18 },
  { id: 'jueves', day: 'J', hours: 22 },
  { id: 'viernes', day: 'V', hours: 28 },
  { id: 'sabado', day: 'S', hours: 16 },
  { id: 'domingo', day: 'D', hours: 12 },
]

const trainingHistory = [
  { title: 'HIIT Full Body', subtitle: '42 min • Fuerte' },
  { title: 'Lower Power', subtitle: '34 min • Fuerza' },
  { title: 'Yoga & Recuperación', subtitle: '26 min • Suave' },
]

const challenges = [
  { title: '7 días seguidos', status: 'Completado' },
  { title: '100k calorías', status: 'En progreso' },
  { title: '3 runs semanales', status: 'Pendiente' },
]

export default function ProfileScreen() {
  const navigation = useNavigation()
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState('Marina López')
  const [userLevel, setUserLevel] = useState('Avanzado')
  const [sessionCount, setSessionCount] = useState('18')

  useEffect(() => {
    let active = true

    const loadProfile = async () => {
      const storedProfile = await loadUserProfile()
      if (active) {
        setUserName(storedProfile.userName)
      }
    }

    loadProfile()

    return () => {
      active = false
    }
  }, [])

  const handleToggleEdit = () => {
    setIsEditing((value) => !value)
  }

  const handleSaveProfile = async () => {
    try {
      await saveUserProfile({ userName })
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile name:', error)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <StatusBar barStyle="light-content" backgroundColor="#07060a" />

      <View className="absolute inset-0 bg-[#07060a]" />
      <View className="absolute -top-16 left-0 h-56 w-56 rounded-full bg-[#321f64] opacity-30" />
      <View className="absolute right-0 top-24 h-56 w-56 rounded-full bg-[#1a2246] opacity-25" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View className="px-5 pt-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs uppercase tracking-[0.25em] text-[#8b79b7]">Perfil</Text>
              <Text className="mt-2 text-3xl font-extrabold text-white">Mi cuenta</Text>
            </View>
            <TouchableOpacity
              className="h-12 w-12 items-center justify-center rounded-3xl bg-[#0e1020] border border-[#4b3f88]"
              onPress={() => navigation.navigate('Home')}
            >
              <Feather name="home" size={20} color="#d6a6ff" />
            </TouchableOpacity>
          </View>

          <View className="mt-6 rounded-[32px] bg-[#101025] p-5 shadow-lg shadow-[#080812]">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-sm text-[#9a80e4]">Usuario</Text>
                {isEditing ? (
                  <TextInput
                    value={userName}
                    onChangeText={setUserName}
                    className="mt-2 rounded-3xl bg-[#0b0e1f] px-4 py-3 text-2xl font-bold text-white"
                    placeholder="Nombre"
                    placeholderTextColor="#5f5b7b"
                  />
                ) : (
                  <Text className="mt-2 text-2xl font-bold text-white">{userName}</Text>
                )}
                {isEditing ? (
                  <View className="mt-1 space-y-3">
                    <TextInput
                      value={userLevel}
                      onChangeText={setUserLevel}
                      className="rounded-3xl bg-[#0b0e1f] px-4 py-3 text-sm text-white"
                      placeholder="Nivel"
                      placeholderTextColor="#5f5b7b"
                    />
                    <TextInput
                      value={sessionCount}
                      onChangeText={setSessionCount}
                      keyboardType="numeric"
                      className="rounded-3xl bg-[#0b0e1f] px-4 py-3 text-sm text-white"
                      placeholder="Sesiones este mes"
                      placeholderTextColor="#5f5b7b"
                    />
                  </View>
                ) : (
                  <Text className="mt-1 text-sm text-[#8e86b3]">{userLevel} • {sessionCount} sesiones este mes</Text>
                )}
              </View>
              <View className="h-16 w-16 items-center justify-center rounded-3xl bg-[#1a1430]">
                <Text className="text-2xl font-extrabold text-[#d6a6ff]">ML</Text>
              </View>
            </View>
            <View className="mt-4 flex-row justify-end gap-3">
              {isEditing && (
                <TouchableOpacity
                  className="rounded-3xl bg-[#3e2b70] px-4 py-2"
                  onPress={handleSaveProfile}
                >
                  <Text className="text-sm font-semibold text-[#d6a6ff]">Guardar</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                className="rounded-3xl bg-[#0e1020] px-4 py-2"
                onPress={handleToggleEdit}
              >
                <Text className="text-sm font-semibold text-[#d6a6ff]">
                  {isEditing ? 'Cancelar' : 'Editar perfil'}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-5 rounded-3xl bg-[#0f1220] p-4">
              <Text className="text-xs uppercase tracking-[0.3em] text-[#7b719d]">Horas esta semana</Text>
              <View className="mt-4 flex-row items-end justify-between">
                {weeklyHours.map((item) => (
                  <View key={item.id} className="items-center">
                    <View
                      className="w-6 rounded-full bg-[#7b6cf5]"
                      style={{ height: item.hours }}
                    />
                    <Text className="mt-2 text-[11px] text-[#b5abdc]">{item.day}</Text>
                  </View>
                ))}
              </View>
              <View className="mt-5 flex-row items-center justify-between">
                <View>
                  <Text className="text-3xl font-bold text-white">12.4</Text>
                  <Text className="text-sm text-[#8e86b3]">Horas acumuladas</Text>
                </View>
                <View className="rounded-3xl bg-[#1b1840] px-4 py-2">
                  <Text className="text-sm font-semibold text-[#c9b3ff]">+24% esta semana</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-6 flex-row flex-wrap justify-between gap-3">
            {quickStats.map((item) => (
              <View key={item.label} className="w-[48%] rounded-3xl bg-[#101025] p-4 shadow-lg shadow-[#070714]">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-[#8e86b3]">{item.label}</Text>
                  <View className="h-10 w-10 items-center justify-center rounded-3xl bg-[#1a1430]">
                    <Feather name={item.icon} size={18} color="#d6a6ff" />
                  </View>
                </View>
                <Text className="mt-4 text-2xl font-bold text-white">{item.value}</Text>
              </View>
            ))}
          </View>

          <View className="mt-6 rounded-[32px] bg-[#101025] p-5 shadow-lg shadow-[#080812]">
            <Text className="text-lg font-bold text-white">Estadísticas hasta la fecha</Text>
            <Text className="mt-2 text-sm text-[#8e86b3]">Métricas de rendimiento acumuladas</Text>

            <View className="mt-5 space-y-4">
              <View className="rounded-3xl bg-[#0f1220] p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-white font-semibold">Consistencia</Text>
                  <Text className="text-[#c9b3ff]">89%</Text>
                </View>
                <ProgressBar progress={0.89} />
              </View>

              <View className="rounded-3xl bg-[#0f1220] p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-white font-semibold">Progreso de fuerza</Text>
                  <Text className="text-[#c9b3ff]">+16%</Text>
                </View>
                <ProgressBar progress={0.76} />
              </View>

              <View className="rounded-3xl bg-[#0f1220] p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-white font-semibold">Cumplimiento de objetivos</Text>
                  <Text className="text-[#c9b3ff]">92%</Text>
                </View>
                <ProgressBar progress={0.92} />
              </View>
            </View>
          </View>

          <View className="mt-6 rounded-[32px] bg-[#101025] p-5 shadow-lg shadow-[#080812]">
            <Text className="text-lg font-bold text-white">Historial de entrenamientos</Text>
            <Text className="mt-1 text-sm text-[#8e86b3]">Tus últimas tres sesiones</Text>

            <View className="mt-4 space-y-3">
              {trainingHistory.map((item) => (
                <View key={item.title} className="rounded-3xl bg-[#0f1220] p-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base font-semibold text-white">{item.title}</Text>
                    <Text className="text-sm text-[#b5abdc]">{item.subtitle}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-6 rounded-[32px] bg-[#101025] p-5 shadow-lg shadow-[#080812]">
            <Text className="text-lg font-bold text-white">Logros y desafíos</Text>
            <Text className="mt-2 text-sm text-[#8e86b3]">Motivación para seguir avanzando</Text>

            <View className="mt-4 space-y-3">
              {challenges.map((item) => (
                <View key={item.title} className="rounded-3xl bg-[#0f1220] p-4 flex-row items-center justify-between">
                  <View>
                    <Text className="text-base font-semibold text-white">{item.title}</Text>
                    <Text className="mt-1 text-sm text-[#b5abdc]">{item.status}</Text>
                  </View>
                  <View className="rounded-2xl bg-[#211c42] px-3 py-1">
                    <Text className="text-xs uppercase text-[#d6a6ff]">{item.status === 'Completado' ? 'Hecho' : item.status === 'En progreso' ? 'Activo' : 'Pendiente'}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-6 rounded-[32px] bg-[#101025] p-5 shadow-lg shadow-[#080812]">
            <Text className="text-lg font-bold text-white">Navegación rápida</Text>
            <View className="mt-4 flex-row flex-wrap justify-between gap-3">
              <TouchableOpacity
                className="w-[48%] rounded-3xl bg-[#1a1631] p-4"
                onPress={() => navigation.navigate('Home')}
              >
                <Text className="text-sm text-[#8e86b3]">Inicio</Text>
                <Text className="mt-3 text-lg font-semibold text-white">Explorar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] rounded-3xl bg-[#1a1631] p-4"
                onPress={() => navigation.navigate('FitnessHome')}
              >
                <Text className="text-sm text-[#8e86b3]">Rutinas</Text>
                <Text className="mt-3 text-lg font-semibold text-white">Sesiones</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] rounded-3xl bg-[#1a1631] p-4"
                onPress={() => navigation.navigate('Performance')}
              >
                <Text className="text-sm text-[#8e86b3]">Progreso</Text>
                <Text className="mt-3 text-lg font-semibold text-white">Estadísticas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] rounded-3xl bg-[#1a1631] p-4"
                onPress={() => navigation.navigate('ActiveExercise')}
              >
                <Text className="text-sm text-[#8e86b3]">Sesión</Text>
                <Text className="mt-3 text-lg font-semibold text-white">Entrenar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
