import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-700">
      <Text className="text-xl font-bold text-blue-500">
        Fitness app!
      </Text>
    </View>
  );
}

