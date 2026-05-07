import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function QuestionHeader({ stepLabel, onBack }) {
  return (
    <View className="flex-row items-center justify-between px-5 pt-4">
      <Pressable
        onPress={onBack}
        hitSlop={12}
        className="h-11 w-11 items-start justify-center"
      >
        <Feather name="arrow-left" size={36} color="#b9a9cc" />
      </Pressable>

      <Text className="flex-1 text-center text-[18px] font-extrabold tracking-[1.8px] text-[#b8a8bf]">
        {stepLabel}
      </Text>

      <View className="h-11 w-11" />
    </View>
  );
}