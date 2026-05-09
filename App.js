import "./global.css";
import { StatusBar } from "expo-status-bar";
import StartScreen from "./app/StartScreen";
import QuestionnaireScreen from "./app/QuestionnaireScreen";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <StartScreen />
    </>
  );
}

