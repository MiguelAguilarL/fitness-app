import { useEffect, useState } from "react";
import { StatusBar as RNStatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { questionnaireData } from "../utils/questionnaireData";
import QuestionHeader from "../components/Questionnaire/QuestionHeader";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/Questionnaire/QuestionCard";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from '@react-navigation/native';
import { useQuestionnaire } from "../context/QuestionnaireContext";

export default function QuestionnaireScreen() {
  const navigation = useNavigation();
  const { answers, setAnswer, submitQuestionnaire } = useQuestionnaire();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const currentQuestion = questionnaireData[currentIndex];

  useEffect(() => {
    setSelectedOptionId(answers[currentQuestion.id] ?? null);
  }, [answers, currentQuestion.id]);

  const handleBack = () => {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex((value) => value - 1);
  };

  const handleNext = async () => {
    if (!selectedOptionId) {
      return;
    }

    if (currentIndex < questionnaireData.length - 1) {
      setCurrentIndex((value) => value + 1);
      return;
    }

    await submitQuestionnaire();
    navigation.navigate('QuestionnaireSummary');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0b1226]">
      <RNStatusBar barStyle="light-content" backgroundColor="#0b1226" />
      <View className="absolute inset-0 bg-[#0b1226]" />
      <View className="absolute -top-24 left-6 h-56 w-56 rounded-full bg-[#1b2447] opacity-30" />
      <View className="absolute right-0 top-24 h-64 w-64 rounded-full bg-[#1a2041] opacity-25" />

      <SafeAreaView edges={["top", "bottom"]} className="flex-1">
        <View className="px-6 pt-4">
          <QuestionHeader stepLabel={currentQuestion.stepLabel} onBack={handleBack} />
          <ProgressBar progress={currentQuestion.progress} />
        </View>

        <View className="flex-1 px-8 justify-center">
          <View>
            <Text className="text-center text-[26px] font-extrabold text-[#dfe5ff]">
              {currentQuestion.title}
            </Text>
            <Text className="mt-4 text-center text-[20px] leading-8 text-[#d0bfcd]">
              {currentQuestion.subtitle}
            </Text>
          </View>

          <View className="mt-8">
            {currentQuestion.options.map((option) => (
              <QuestionCard
                key={option.id}
                label={option.label}
                icon={option.icon}
                selected={selectedOptionId === option.id}
                onPress={() => {
                  setSelectedOptionId(option.id);
                  setAnswer(currentQuestion.id, option.id);
                }}
              />
            ))}
          </View>
        </View>

        <View className="px-6 pb-6">
          <PrimaryButton label="Siguiente" onPress={handleNext} disabled={!selectedOptionId} />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}