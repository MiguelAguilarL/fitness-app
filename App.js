import "./global.css";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigation/RootNavigator";
import { QuestionnaireProvider } from "./context/QuestionnaireContext";

export default function App() {
  return (
    <QuestionnaireProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </QuestionnaireProvider>
  );
}

