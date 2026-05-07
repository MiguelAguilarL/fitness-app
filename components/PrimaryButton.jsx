import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PrimaryButton({ label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="mx-4 mb-6 rounded-[24px] bg-[#d9adff] px-6 py-7"
      style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
    >
      <View className="flex-row items-center justify-center gap-3">
        <Text className="text-[26px] font-extrabold text-[#4d1595]">{label}</Text>
        <Feather name="arrow-right" size={30} color="#4d1595" />
      </View>
    </Pressable>
  );
}