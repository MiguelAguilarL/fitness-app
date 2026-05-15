import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import ExerciseDetailHeader from '../components/Exercise/ExerciseDetailHeader';
import ExerciseDetailImage from '../components/Exercise/ExerciseDetailImage';
import ExerciseDetailInfo from '../components/Exercise/ExerciseDetailInfo';
import ExerciseDescription from '../components/Exercise/ExerciseDescription';
import ExerciseDetailTips from '../components/Exercise/ExerciseDetailTips';
import ExerciseDetailDebugPanel from '../components/Exercise/ExerciseDetailDebugPanel';
import ExerciseDetailActions from '../components/Exercise/ExerciseDetailActions';

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
          <ExerciseDetailDebugPanel exercise={exercise} normalizedGifUrl={normalizedGifUrl} />
        ) : null}

        <ExerciseDetailInfo exercise={exercise} />
        <ExerciseDescription exerciseName={exercise?.name} />
        <ExerciseDetailTips exerciseName={exercise?.name} />

        <ExerciseDetailActions onGoBack={handleGoBack} />
      </ScrollView>
    </SafeAreaView>
  );
}
