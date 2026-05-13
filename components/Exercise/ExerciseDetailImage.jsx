import React, { useMemo, useState } from 'react';
import { Image, View, Text, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function normalizeRemoteUrl(urlValue) {
  const rawUrl = String(urlValue ?? '').trim();

  if (!rawUrl) {
    return '';
  }

  return /^http:\/\//i.test(rawUrl) ? rawUrl.replace(/^http:\/\//i, 'https://') : rawUrl;
}

export default function ExerciseDetailImage({ gifUrl, fallbackImageUrl }) {
  const [isLoading, setIsLoading] = useState(false);
  const [sourceMode, setSourceMode] = useState('gif');

  const normalizedGifUrl = useMemo(() => normalizeRemoteUrl(gifUrl), [gifUrl]);
  const normalizedFallbackImageUrl = useMemo(
    () => normalizeRemoteUrl(fallbackImageUrl),
    [fallbackImageUrl]
  );

  const activeImageUrl =
    sourceMode === 'gif' ? normalizedGifUrl : sourceMode === 'fallback' ? normalizedFallbackImageUrl : '';

  const handleLoadStart = () => setIsLoading(true);
  const handleLoadEnd = () => setIsLoading(false);
  const handleError = (err) => {
    setIsLoading(false);

    if (sourceMode === 'gif' && normalizedFallbackImageUrl) {
      setSourceMode('fallback');
      return;
    }

    setSourceMode('placeholder');

    const errorMessage =
      err?.nativeEvent?.error ?? err?.message ?? (typeof err === 'string' ? err : 'unknown error');

    console.warn('[ExerciseDetailImage] image load failed:', errorMessage);
  };

  return (
    <View className="mx-6 mt-4 overflow-hidden rounded-3xl bg-[#17171b]">
      <View className="h-96 overflow-hidden bg-[#120f1c]">
        {activeImageUrl ? (
          <>
            <Image
              source={{ uri: activeImageUrl }}
              className="h-full w-full"
              resizeMode="cover"
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onError={handleError}
            />
            <View className="absolute inset-0 bg-[#150a27]/40" />
            {isLoading && (
              <View className="absolute inset-0 items-center justify-center bg-[#120f1c]/60">
                <ActivityIndicator color="#d6a6ff" size="large" />
              </View>
            )}
          </>
        ) : (
          <View className="flex-1 items-center justify-center bg-[#120f1c] px-6">
            <MaterialCommunityIcons name="dumbbell" size={64} color="#a74cff" />
            <Text className="mt-4 text-center text-sm text-[#8f86a5]">
              {sourceMode === 'placeholder' ? 'No se pudo cargar la imagen' : 'GIF no disponible'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
