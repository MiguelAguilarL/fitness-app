import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import ExerciseDetailHeader from '../components/Exercise/ExerciseDetailHeader';
import ExerciseDetailImage from '../components/Exercise/ExerciseDetailImage';
import ExerciseDetailInfo from '../components/Exercise/ExerciseDetailInfo';
import ExerciseDescription from '../components/Exercise/ExerciseDescription';
import ExerciseDetailTips from '../components/Exercise/ExerciseDetailTips';

function DebugRow({ label, value }) {
  return (
    <View className="flex-row items-start gap-2">
      <Text className="w-28 text-[12px] font-bold text-[#d6a6ff]">{label}</Text>
      <Text className="flex-1 text-[12px] text-[#d1d1d6]">{String(value ?? 'null')}</Text>
    </View>
  );
}

export default function ExerciseDetailScreen({ route, navigation }) {
  const { exercise } = route.params;
  const normalizedGifUrl = /^http:\/\//i.test(String(exercise?.gifUrl ?? '').trim())
    ? String(exercise?.gifUrl).replace(/^http:\/\//i, 'https://')
    : String(exercise?.gifUrl ?? '').trim();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#07060a]">
      <StatusBar barStyle="light-content" backgroundColor="#07060a" />

      <View className="absolute inset-0 bg-[#07060a]" />
      <View className="absolute -top-20 left-0 h-52 w-52 rounded-full bg-[#25143f] opacity-30" />
      <View className="absolute right-0 top-24 h-56 w-56 rounded-full bg-[#1b2447] opacity-22" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ExerciseDetailHeader onGoBack={handleGoBack} />
        <ExerciseDetailImage gifUrl={exercise?.gifUrl} fallbackImageUrl={exercise?.images?.[0]} />

        {__DEV__ ? (
          <View className="mx-6 mt-4 rounded-2xl border border-[#d6a6ff]/40 bg-[#140f1f] p-4">
            <Text className="mb-3 text-[14px] font-black text-[#f1d3ff]">Debug GIF</Text>
            <DebugRow label="id" value={exercise?.id} />
            <DebugRow label="name" value={exercise?.name} />
            <DebugRow label="gifUrl(raw)" value={exercise?.gifUrl || 'empty'} />
            <DebugRow label="gifUrl(norm)" value={normalizedGifUrl || 'empty'} />
            <DebugRow label="hasGif" value={Boolean(normalizedGifUrl)} />
            <DebugRow label="bodyPart" value={exercise?.bodyPart} />
            <DebugRow label="target" value={exercise?.target} />
            <DebugRow label="equipment" value={exercise?.equipment} />
          </View>
        ) : null}

        <ExerciseDetailInfo exercise={exercise} />
        <ExerciseDescription exerciseName={exercise?.name} />
        <ExerciseDetailTips exerciseName={exercise?.name} />

        {/* Botón de cerrar */}
        <View className="px-6">
          <TouchableOpacity
            onPress={handleGoBack}
            className="mt-8 mb-4 h-14 items-center justify-center rounded-2xl bg-[#d6a6ff]"
          >
            <Text className="text-lg font-bold text-[#07060a]">Volver</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
