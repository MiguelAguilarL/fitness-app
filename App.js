import "./global.css";
import { StatusBar } from "expo-status-bar";
import FitnessHomeScreen from "./app/FitnessHomeScreen";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FitnessHomeScreen />
    </>
  );
}

