import React, { useRef } from "react";
import { Pressable, Text, View, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PrimaryButton({ label, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start();
  };

  return (
    <Animated.View
      style={{ transform: [{ scale }], shadowColor: "#4d1595", shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => animateTo(0.98)}
        onPressOut={() => animateTo(1)}
        className="mx-4 mb-6 rounded-[24px] bg-[#d9adff] px-6 py-7"
        style={({ pressed }) => [{ opacity: pressed ? 0.96 : 1 }]}
      >
        <View className="flex-row items-center justify-center gap-3">
          <Text className="text-[26px] font-extrabold text-[#4d1595]">{label}</Text>
          <Feather name="arrow-right" size={30} color="#4d1595" />
        </View>
      </Pressable>
    </Animated.View>
  );
}