import React, { useMemo } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import PrimaryButton from '../components/PrimaryButton';

export default function QuestionnaireSummaryScreen() {
  const navigation = useNavigation();
  const { profile } = useQuestionnaire();

  const getTrainingLevelColor = (level) => {
    switch (level) {
      case 'avanzado':
        return '#d8abff';
      case 'intermedio':
        return '#ad67ff';
      default:
        return '#7b728e';
    }
  };

  const getUserType = () => {
    if (!profile) return 'No disponible';

    const { goal, experience, trainingLevel } = profile;

    if (goal?.id === 'gain-muscle' && experience?.id === 'advanced') {
      return 'Atleta Profesional';
    }

    if (goal?.id === 'gain-muscle' && experience?.id === 'intermediate') {
      return 'Deportista Dedicado';
    }

    if (goal?.id === 'lose-fat' && experience?.id === 'beginner') {
      return 'Iniciador Fitness';
    }

    if (goal?.id === 'health') {
      return 'Entrenador de Salud';
    }

    return 'Entrenador Personalizado';
  };

  const profileColor = getTrainingLevelColor(profile?.trainingLevel);
  const userType = getUserType();

  return (
    <SafeAreaView className="flex-1 bg-[#0b1226]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="absolute inset-0 bg-[#0b1226]" />
        <View className="absolute -top-24 left-6 h-56 w-56 rounded-full bg-[#1b2447] opacity-30" />
        <View className="absolute right-0 top-24 h-64 w-64 rounded-full bg-[#1a2041] opacity-25" />

        {/* Header */}
        <View className="z-10 px-6 pt-6">
          <Text className="text-center text-[32px] font-extrabold text-[#dfe5ff]">
            ¡Tu Perfil Creado!
          </Text>
          <Text className="mt-2 text-center text-[16px] text-[#b9a9cc]">
            Aquí está tu categorización personalizada
          </Text>
        </View>

        {/* Profile Card */}
        <View className="z-10 mx-6 mt-8 rounded-[28px] bg-gradient-to-br from-[#1a1430] to-[#0f0a1a] p-6 border border-[#2d3550]">
          {/* User Type Badge */}
          <View className="mb-6 items-center">
            <View
              className="rounded-full px-6 py-3"
              style={{ backgroundColor: profileColor + '22', borderColor: profileColor + '66', borderWidth: 2 }}
            >
              <Text className="text-center font-bold text-[18px]" style={{ color: profileColor }}>
                {userType}
              </Text>
            </View>
          </View>

          {/* Training Level */}
          <View className="mb-6 rounded-[16px] bg-[#161020] p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-[14px] font-semibold text-[#b9a9cc]">NIVEL DE ENTRENAMIENTO</Text>
                <Text className="mt-1 text-[22px] font-bold text-[#d6a6ff]" style={{ textTransform: 'capitalize' }}>
                  {profile?.trainingLevel || 'No disponible'}
                </Text>
              </View>
              <View
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: profileColor + '33' }}
              >
                <Feather name="trending-up" size={28} color={profileColor} />
              </View>
            </View>
          </View>

          {/* Summary */}
          <View className="mb-6 rounded-[16px] bg-[#161020] p-4">
            <Text className="text-[14px] font-semibold text-[#b9a9cc]">TU RESUMEN</Text>
            <View className="mt-3 space-y-2">
              {profile?.summary && profile.summary.length > 0 ? (
                profile.summary.map((item, idx) => (
                  <View key={idx} className="flex-row items-center">
                    <View className="h-2 w-2 rounded-full bg-[#ad67ff] mr-3" />
                    <Text className="text-[15px] text-[#d6a6ff]">{item}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-[15px] text-[#7b728e]">No hay datos disponibles</Text>
              )}
            </View>
          </View>

          {/* Recommended Split */}
          {profile?.recommendedSplit && (
            <View className="rounded-[16px] bg-[#161020] p-4">
              <Text className="text-[14px] font-semibold text-[#b9a9cc]">PLAN RECOMENDADO</Text>
              <Text className="mt-2 text-[18px] font-bold text-[#d6a6ff]">
                {profile.recommendedSplit}
              </Text>
              <Text className="mt-1 text-[13px] text-[#b9a9cc]">
                Basado en tu objetivo, experiencia y disponibilidad
              </Text>
            </View>
          )}
        </View>


        {/* Button */}
        <View className="z-10 mx-6 mb-8 mt-8">
          <PrimaryButton
            label="Ir a mi Inicio"
            onPress={() => navigation.navigate('Home')}
            size="md"
            full
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
