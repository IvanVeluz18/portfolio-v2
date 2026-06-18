'use client';

import { useRef, useCallback, useEffect } from 'react';

export function useSound(src: string, volume = 0.5) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
    audioRef.current.preload = 'auto';
  }, [src, volume]);

  const play = useCallback(() => {
    const base = audioRef.current;
    if (!base) return;
    const instance = base.cloneNode() as HTMLAudioElement;
    instance.volume = base.volume;
    instance.play().catch(() => {
    });
  }, []);

  return play;
}