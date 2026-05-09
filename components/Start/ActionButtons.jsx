import { View, Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ActionButtons({ onGetStarted }) {
  return (
    <View className="w-full flex-col items-center gap-4">
      {/* Primary Button - Get Started */}
      <Pressable
        onPress={onGetStarted}
        className="w-full h-16 rounded-2xl bg-primary flex-row items-center justify-center gap-3 shadow-lg"
        style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
      >
        <Text className="text-xl font-black uppercase tracking-widest text-on-primary">
          Comenzar
        </Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={24}
          color="#490080"
        />
      </Pressable>
    </View>
  );
}
