'use client';

import { useEffect, useRef } from 'react';
import { AUDIO_SPRITE } from '@/constant/sprite';

export const useTypingAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
        const context = new AudioContextClass();
        audioContextRef.current = context;

        const response = await fetch('/sound.mp3');
        const arrayBuffer = await response.arrayBuffer();
        const decodedBuffer = await context.decodeAudioData(arrayBuffer);
        audioBufferRef.current = decodedBuffer;
      } catch (error) {
        console.error("Audio 로딩 실패:", error);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  const playSound = (type: 'normal' | 'space' | 'backspace' = 'normal') => {
    const context = audioContextRef.current;
    const buffer = audioBufferRef.current;

    if (!context || !buffer) return;

    const doPlay = () => {
      let sprite;
      if (type === 'normal') {
        const normalSprites = AUDIO_SPRITE.normal;
        sprite = normalSprites[Math.floor(Math.random() * normalSprites.length)];
      } else {
        sprite = AUDIO_SPRITE[type];
      }

      const source = context.createBufferSource();
      source.buffer = buffer;

      const pitchRange = type === 'normal' ? 0.06 : 0.02;
      source.playbackRate.value = (1 - pitchRange / 2) + Math.random() * pitchRange;

      source.connect(context.destination);
      // context.currentTime 기준으로 즉시 재생 — 0 대신 명시적 타임스탬프로 정밀 스케줄링
      source.start(context.currentTime, sprite.start, sprite.duration);
    };

    // resume()이 완료된 후 재생해야 첫 번째 키 입력에서 사운드가 누락되지 않음
    if (context.state === 'suspended') {
      context.resume().then(doPlay);
    } else {
      doPlay();
    }
  };

  return { playSound };
};