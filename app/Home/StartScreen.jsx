import { View, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import StartHeader from '../../components/Start/StartHeader';
import MetricsGrid from '../../components/Start/MetricsGrid';
import ActionButtons from '../../components/Start/ActionButtons';

export default function StartScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("Questionnaire");
  };

  const backgroundImage = {
    uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop",
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={backgroundImage}
          className="flex-1 relative"
          imageStyle={{ opacity: 0.35 }}
        >
          <View className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
          <View 
            className="absolute top-1/4 -left-1/3 w-96 h-96 rounded-full blur-3xl opacity-20 z-0"
            style={{ backgroundColor: "#ddb7ff" }}
          />
          <View 
            className="absolute bottom-0 -right-1/3 w-96 h-96 rounded-full blur-3xl opacity-15 z-0"
            style={{ backgroundColor: "#b76dff" }}
          />

          <View className="flex-1 flex-col items-center justify-between w-full px-6 pt-8 pb-16 z-20">
            <View className="flex-grow flex-col items-center justify-center w-full">
              <StartHeader />
            </View>

            <MetricsGrid />

            <ActionButtons onGetStarted={handleGetStarted} />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
