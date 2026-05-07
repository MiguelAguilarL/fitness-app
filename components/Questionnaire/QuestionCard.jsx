import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const iconMap = {
  dumbbell: "cpu",
  flame: "droplet",
  heart: "heart",
  sparkles: "star",
  activity: "activity",
  "trending-up": "trending-up",
  calendar: "calendar",
  "building-2": "grid",
  home: "home",
  repeat: "repeat",
  clock: "clock",
  "arrow-up": "arrow-up",
  "arrow-down": "arrow-down",
  move: "move",
  slash: "slash",
  wind: "wind",
  zap: "zap",
  circle: "circle",
  scale: "sliders",
  "check-circle": "check-circle",
  "book-open": "book-open",
  "help-circle": "help-circle",
  target: "target",
  footprints: "map-pin",
  play: "play",
};

export default function QuestionCard({ label, icon, selected, onPress }) {
  const iconName = iconMap[icon] ?? "circle";

  return (
    <Pressable
      onPress={onPress}
      className={`mx-4 my-4 rounded-[24px] border px-6 py-8 ${selected ? "border-[#d8abff] bg-[#232842]" : "border-[#2d3550] bg-[#181d34]"}`}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.985 : 1 }],
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 22,
          shadowOffset: { width: 0, height: 14 },
          elevation: 4,
        },
      ]}
    >
      <View className={`mx-auto mb-8 h-32 w-32 items-center justify-center rounded-full ${selected ? "bg-[#4a4f6a]" : "bg-[#2d3550]"}`}>
        <Feather name={iconName} size={40} color="#e0e5ff" />
      </View>

      <Text className="text-center text-[28px] font-extrabold text-[#dfe5ff]" numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}