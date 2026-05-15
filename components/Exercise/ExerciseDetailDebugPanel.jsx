import React from 'react';
import { Text, View } from 'react-native';

function DebugRow({ label, value }) {
  return (
    <View className="flex-row items-start gap-2">
      <Text className="w-28 text-[12px] font-bold text-[#d6a6ff]">{label}</Text>
      <Text className="flex-1 text-[12px] text-[#d1d1d6]">{String(value ?? 'null')}</Text>
    </View>
  );
}

export default function ExerciseDetailDebugPanel({ exercise, normalizedGifUrl }) {
  return (
    <View className="mx-6 mt-4 rounded-2xl border border-[#d6a6ff]/40 bg-[#140f1f] p-4">
      <Text className="mb-3 text-[14px] font-black text-[#f1d3ff]">Debug GIF</Text>
      <DebugRow label="id" value={exercise?.id} />
      <DebugRow label="name" value={exercise?.name} />
      <DebugRow label="gifUrl(raw)" value={exercise?.gifUrl || 'empty'} />
      <DebugRow label="gifUrl(norm)" value={normalizedGifUrl || 'empty'} />
      <DebugRow label="hasGif" value={Boolean(normalizedGifUrl)} />
      <DebugRow label="bodyPart" value={exercise?.bodyPart} />
      <DebugRow label="target" value={exercise?.target} />
      <DebugRow label="equipment" value={exercise?.equipment} />
    </View>
  );
}