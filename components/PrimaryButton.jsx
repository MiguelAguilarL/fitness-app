import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const sizeClasses = {
  md: {
    container: "mx-4 mb-6 rounded-[24px] bg-[#d9adff] px-6 py-7",
    text: "text-[26px]",
    icon: 30,
    gap: "gap-3",
  },
  card: {
    container: "mx-0 rounded-[22px] bg-[#d9adff] px-6 py-4",
    text: "text-[20px]",
    icon: 24,
    gap: "gap-2",
  },
  sm: {
    container: "mx-0 rounded-full bg-[#d9adff] px-5 py-3",
    text: "text-[18px]",
    icon: 18,
    gap: "gap-2",
  },
};

export default function PrimaryButton({ label, onPress, size = "md", full = false }) {
  const variant = sizeClasses[size] ?? sizeClasses.md;
  const containerClass = full ? `${variant.container} w-full mx-0` : variant.container;

  return (
    <Pressable
      onPress={onPress}
      className={containerClass}
      style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}
    >
      <View className={`flex-row items-center justify-center ${variant.gap}`}>
        <Text className={`font-extrabold text-[#4d1595] ${variant.text}`}>{label}</Text>
        <Feather name="arrow-right" size={variant.icon} color="#4d1595" />
      </View>
    </Pressable>
  );
}