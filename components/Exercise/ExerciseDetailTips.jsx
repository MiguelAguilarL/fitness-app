import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

function getExerciseTips(exerciseName) {
  const name = (exerciseName ?? '').toLowerCase();

  if (name.includes('push') || name.includes('press')) {
    return [
      'Mantén los codos ligeramente flexionados en la posición final',
      'Evita arquear demasiado la espalda',
      'Respira hacia adentro al bajar, hacia afuera al empujar',
    ];
  }

  if (name.includes('pull') || name.includes('row')) {
    return [
      'Siente la contracción en la espalda, no en los brazos',
      'Evita balancearte; usa movimientos controlados',
      'Retrae los omóplatos hacia atrás al final del movimiento',
    ];
  }

  if (name.includes('squat') || name.includes('leg')) {
    return [
      'Mantén las rodillas alineadas con los pies',
      'El peso debe estar en los talones, no en las puntas',
      'No dejes que las rodillas colicen hacia adentro',
    ];
  }

  if (name.includes('deadlift')) {
    return [
      'Mantén la barra pegada al cuerpo durante todo el movimiento',
      'Levanta con las piernas, no solo con la espalda',
      'Mantén la columna neutra; no redondes la espalda',
    ];
  }

  if (name.includes('curl')) {
    return [
      'Evita balancear el cuerpo; usa solo los brazos',
      'Mantén los codos contra el cuerpo',
      'No bloquees los codos en la posición baja',
    ];
  }

  if (name.includes('bench') || name.includes('chest')) {
    return [
      'Mantén los pies firmemente en el suelo',
      'La barra debe tocar el pecho de forma controlada',
      'No rebotes; baja y sube con fluidez',
    ];
  }

  // Tips genéricos por defecto
  return [
    'Mantén una forma adecuada durante todo el ejercicio',
    'Controla el movimiento, no uses el impulso',
    'Incrementa el peso progresivamente',
  ];
}

export default function ExerciseDetailTips({ exerciseName }) {
  const tips = getExerciseTips(exerciseName);

  return (
    <View className="px-6 space-y-4">
      <Text className="text-xl font-bold text-white">⚠️ Consejos importantes</Text>
      <View className="space-y-3">
        {tips.map((tip, index) => (
          <View key={index} className="flex-row gap-3 rounded-xl bg-[#17171b] p-4">
            <Feather name="alert-circle" size={18} color="#d6a6ff" />
            <Text className="flex-1 text-sm text-[#d1d1d6]">{tip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
