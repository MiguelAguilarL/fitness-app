import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MetricCard({
  icon,
  label,
  title,
  iconColor = "#5de6ff",
}) {
  return (
    <View className="flex-1 rounded-3xl bg-surface-container-low/70 border 
    border-outline-variant/40 p-5 shadow-lg ">
      {/* Icon Container */}
      <View className="mb-4 flex-row">
        <View
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <MaterialCommunityIcons name={icon} size={28} color={iconColor} />
        </View>
      </View>

      {/* Label */}
      <Text className="text-xs font-black uppercase tracking-wider text-secondary mb-2">
        {label}
      </Text>

      {/* Title */}
      <Text className="text-xl font-black text-on-surface leading-6">
        {title}
      </Text>
    </View>
  );
}
