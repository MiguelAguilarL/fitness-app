import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function StartHeader() {
  return (
    <View className="flex-col items-center justify-center w-full gap-6">
      {/* Decorative Icon */}
      <View className="flex-row items-center gap-2 mb-2">
        <MaterialCommunityIcons
          name="dumbbell"
          size={32}
          color="#ddb7ff"
        />
      </View>

      {/* Logo with gradient effect */}
      <View className="items-center">
        <Text className="text-7xl font-black italic -tracking-wider text-primary mb-2 text-center drop-shadow-lg"
          style={{
            textShadowColor: "rgba(221, 183, 255, 0.5)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 8,
          }}
        >
          FITNESS
        </Text>
        <Text className="text-6xl font-black italic -tracking-wider text-primary text-center drop-shadow-lg"
          style={{
            textShadowColor: "rgba(221, 183, 255, 0.5)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 8,
          }}
        >
          APP
        </Text>
      </View>

      {/* Tagline Glass Pill */}
      <View className="flex-row items-center gap-2 rounded-full bg-surface-container-low/80 
      px-6 py-3 border border-outline-variant/50 h-20">
        <MaterialCommunityIcons
          name="lightning-bolt"
          size={30}
          color="#5de6ff"
        />
        <Text className="text-lg font-bold uppercase tracking-wider text-on-surface-variant text-center max-w-xs">
          Domina tu entrenamiento. Supera tus límites.
        </Text>
      </View>
    </View>
  );
}
