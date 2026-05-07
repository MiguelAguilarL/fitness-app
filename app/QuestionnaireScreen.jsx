import { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar as RNStatusBar, Text, View } from "react-native";
import { questionnaireData } from "../utils/questionnaireData";
import QuestionHeader from "../components/Questionnaire/QuestionHeader";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/Questionnaire/QuestionCard";
import PrimaryButton from "../components/PrimaryButton";

export default function QuestionnaireScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const currentQuestion = questionnaireData[currentIndex];

  const handleBack = () => {
    if (currentIndex === 0) {
      return;
    }

    setCurrentIndex((value) => value - 1);
    setSelectedOptionId(null);
  };

  const handleNext = () => {
    if (currentIndex < questionnaireData.length - 1) {
      setCurrentIndex((value) => value + 1);
      setSelectedOptionId(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0b1226]">
      <RNStatusBar barStyle="light-content" backgroundColor="#0b1226" />
      <View className="absolute inset-0 bg-[#0b1226]" />
      <View className="absolute -top-24 left-6 h-56 w-56 rounded-full bg-[#1b2447] opacity-30" />
      <View className="absolute right-0 top-24 h-64 w-64 rounded-full bg-[#1a2041] opacity-25" />

      <QuestionHeader stepLabel={currentQuestion.stepLabel} onBack={handleBack} />
      <ProgressBar progress={currentQuestion.progress} />

      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
          <View className="px-8 pt-20">
            <Text className="text-center text-[26px] font-extrabold text-[#dfe5ff]">
            {currentQuestion.title}
            </Text>
            <Text className="mt-6 text-center text-[28px] leading-10 text-[#d0bfcd]">
            {currentQuestion.subtitle}
            </Text>
          </View>

          <View className="mt-14">
            {currentQuestion.options.map((option) => (
              <QuestionCard
                key={option.id}
                label={option.label}
                icon={option.icon}
                selected={selectedOptionId === option.id}
                onPress={() => setSelectedOptionId(option.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View className="pb-2 pt-2">
          <PrimaryButton label="Siguiente" onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
}