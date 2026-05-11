import { View } from "react-native";
import MetricCard from "./MetricCard";

export default function MetricsGrid() {
  return (
    <View className="w-full mb-12 mt-12 gap-4 px-2">
      <View className="flex-row gap-4">
        <MetricCard
          icon="chart-line"
          label="Seguimiento"
          title="Estadísticas Detalladas"
          iconColor="#5de6ff"
        />
        <MetricCard
          icon="fire"
          label="Resultados"
          title="Máximo Rendimiento"
          iconColor="#ffafd3"
        />
      </View>
    </View>
  );
}
