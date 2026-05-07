import "./global.css";
import { StatusBar } from "expo-status-bar";
import QuestionnaireScreen from "./app/QuestionnaireScreen";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <QuestionnaireScreen />
    </>
  );
}

