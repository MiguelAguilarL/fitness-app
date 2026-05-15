import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

function getExerciseInstructions(exerciseName) {
  const name = (exerciseName ?? '').toLowerCase();

  if (name.includes('push') || name.includes('press')) {
    return [
      'Posición inicial: De pie o sentado con espalda recta',
      'Flexiona los codos y lleva el peso hacia el pecho',
      'Mantén los hombros relajados durante todo el movimiento',
      'Extiende los brazos hacia adelante de forma controlada',
      'Regresa a la posición inicial sin bloquear los codos',
      'Realiza 3 series de 8-12 repeticiones',
    ];
  }

  if (name.includes('pull') || name.includes('row') || name.includes('lat')) {
    return [
      'Posición inicial: Brazos extendidos, pecho erguido',
      'Contrae la espalda y tira hacia el cuerpo',
      'Lleva los codos hacia atrás y hacia abajo',
      'Mantén el pecho elevado durante el movimiento',
      'Retorna controladamente a la posición inicial',
      'Realiza 3 series de 8-12 repeticiones',
    ];
  }

  if (name.includes('squat') || name.includes('leg') || name.includes('pierna')) {
    return [
      'De pie con pies al ancho de hombros',
      'Mantén el pecho erguido y la espalda recta',
      'Desciende flexionando las rodillas y cadera',
      'Las rodillas no deben pasar la punta de los pies',
      'Desciende hasta que los muslos estén paralelos al suelo',
      'Sube empujando con los talones',
      'Realiza 3 series de 10-15 repeticiones',
    ];
  }

  if (name.includes('curl') || name.includes('biceps')) {
    return [
      'De pie con pies al ancho de hombros, brazos relajados',
      'Sostén una mancuerna en cada mano con palmas hacia adelante',
      'Flexiona los codos y sube el peso hacia los hombros',
      'Mantén los codos inmóviles contra el cuerpo',
      'Contrae el bíceps en la parte superior',
      'Baja controladamente a la posición inicial',
      'Realiza 3 series de 10-12 repeticiones',
    ];
  }

  if (name.includes('triceps') || name.includes('dip')) {
    return [
      'Agarrate de una barra o banco con brazos extendidos',
      'Flexiona los codos para bajar el cuerpo',
      'Mantén los codos cerca del cuerpo',
      'Desciende hasta que los brazos formen un ángulo de 90°',
      'Sube extendiendo los brazos completamente',
      'Evita encorvarte hacia adelante',
      'Realiza 3 series de 8-12 repeticiones',
    ];
  }

  if (name.includes('plank') || name.includes('abdominal') || name.includes('core')) {
    return [
      'Posición inicial: Acostado boca abajo',
      'Apóyate en los antebrazos y las puntas de los pies',
      'Mantén el cuerpo en línea recta de cabeza a talones',
      'Contrae el abdomen durante todo el ejercicio',
      'No dejes que las caderas bajen ni suban',
      'Respira de forma constante y controlada',
      'Mantén la posición entre 20-60 segundos',
    ];
  }

  // Instrucciones genéricas por defecto
  return [
    'Caliente los músculos antes de comenzar',
    'Realiza el movimiento de forma lenta y controlada',
    'Mantén una buena postura durante todo el ejercicio',
    'No retengas la respiración; respira de forma natural',
    'Incrementa el peso progresivamente con el tiempo',
    'Realiza 3 series de 8-15 repeticiones',
  ];
}

export default function ExerciseDescription({ exerciseName, target, bodyPart }) {
  const instructions = getExerciseInstructions(exerciseName);

  return (
    <View className="px-6 py-6 space-y-4">
      <Text className="text-xl font-bold text-white">Cómo realizar este ejercicio</Text>
      <View className="space-y-3">
        {instructions.map((instruction, index) => (
          <View key={index} className="flex-row gap-3">
            <View className="mt-1 h-5 w-5 items-center justify-center rounded-full bg-[#d6a6ff]">
              <Text className="text-[11px] font-bold text-[#07060a]">{index + 1}</Text>
            </View>
            <Text className="flex-1 text-base text-[#d1d1d6]">{instruction}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
