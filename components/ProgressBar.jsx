import { View } from "react-native";

export default function ProgressBar({ progress }) {
  return (
    <View className="mx-5 mt-5 h-3 overflow-hidden rounded-full bg-[#2a3146]">
      <View
        className="h-full rounded-full bg-[#d6a6ff]"
        style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
      />
    </View>
  );
}