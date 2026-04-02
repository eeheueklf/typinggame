'use client';

import React, { useState, useEffect, useMemo, useRef } from "react";
import * as Hangul from "hangul-js";
import ResultModal from "@/components/ResultModal";
import QuoteSkeleton from "@/components/Skeleton/QuoteSkeleton";

const SPRITE_DATA = {
  normal: [
  { start: 3.3, duration: 0.1 },
  { start: 4.3, duration: 0.1 },
  { start: 4.1, duration: 0.1 },
  { start: 5.6, duration: 0.1 },
  { start: 6.1, duration: 0.1 }, 
  { start: 6.2, duration: 0.1 },
  { start: 6.5, duration: 0.1 },
  ],
  space: { start: 11.5, duration: 0.4 },
  backspace: { start: 13.0, duration: 0.1 },
};


interface TypingLocalProps {
  lyrics: string;
}

const TypingLocal: React.FC<TypingLocalProps> = ({ lyrics }) => {
  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [cpm, setCpm] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);

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
    setMounted(true);
  }, []);

  const playTypingSound = (type: 'normal' | 'space' | 'backspace' = 'normal') => {
    const context = audioContextRef.current;
    const buffer = audioBufferRef.current;
    if (!context || !buffer) return;

    if (context.state === 'suspended') context.resume();

    let sprite;
    if (type === 'normal') {
      const normalSprites = SPRITE_DATA.normal;
      sprite = normalSprites[Math.floor(Math.random() * normalSprites.length)];
    } else {
      sprite = SPRITE_DATA[type];
    }

    const source = context.createBufferSource();
    source.buffer = buffer;

    const pitchRange = type === 'normal' ? 0.06 : 0.02;
    source.playbackRate.value = (1 - pitchRange / 2) + Math.random() * pitchRange;

    source.connect(context.destination);
    source.start(0, sprite.start, sprite.duration);
  };

  const totalTypedChars = useMemo(() => 
   Hangul.disassemble(inputValue, true).flat().length, [inputValue]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (startTime === null) setStartTime(Date.now());

    if (e.key === " ") {
      playTypingSound('space');
    } else if (e.key === "Backspace") {
      playTypingSound('backspace');
    }

    if (e.key === "Enter" && inputValue.length === lyrics.length) {
      if (startTime !== null) {
        const timeTaken = Date.now() - startTime;
        const chars = Hangul.disassemble(inputValue, true).flat();
        let correct = 0;
        for (let i = 0; i < lyrics.length; i++) {
          if (inputValue[i] === lyrics[i]) correct++;
        }
        setCorrectChars(prev => prev + correct);
        setTotalChars(prev => prev + lyrics.length);
        setCpm(Math.round(chars.length / (timeTaken / 60000)));
      }
      setCompleted(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
  
    if (newValue !== inputValue && newValue.slice(-1) !== " ") {
      playTypingSound('normal');
    }
  
    setInputValue(newValue);
  };

  const handleRetry = () => {
    setInputValue("");
    setStartTime(null);
    setCompleted(false);
    setCpm(0);
    setCorrectChars(0);
    setTotalChars(0);
  };

  useEffect(() => {
    if (startTime === null || completed) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setCpm(Math.round(totalTypedChars / (elapsed / 60000)));
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, totalTypedChars, completed]);

  useEffect(() => {
    setMounted(true);
    handleRetry();
  }, [lyrics]);

  if (!mounted) {
    return <QuoteSkeleton />; 
  }

  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
  const totalLyricsChars = Hangul.disassemble(lyrics, true).flat().length;

  return (
    <div className="h-[370px] w-[--tpg-basic-width] ">
      {completed && (
        <ResultModal
          lyrics={lyrics}
          accuracy={accuracy}
          cpm={cpm}
          onRetry={handleRetry}
        />
      )}

      <div className="h-[2px] bg-[--progress-bg] mb-6">
        <div
          className="h-full bg-[--key-fill-red] transition-[width] duration-300 ease-out"
          style={{ width: `${(totalTypedChars / totalLyricsChars) * 100}%` }}
        />
      </div>

      <div className="min-h-[300px] w-full flex flex-col overflow-hidden">
        <p className="mb-4 w-full text-[length:var(--typing-size)] leading-normal">
          {lyrics.split("").map((char, i) => {
            const typedChar = inputValue[i];
            let color = "text-[--color-basic]";
            let textDecoration = "decoration-transparent";

            if (typedChar !== undefined) {
              if (i === inputValue.length - 1) {
                color = "text-black";
              } else {
                if (typedChar === char) {
                  color = "text-[--color-correct]";
                } else {
                  color = "text-[--color-wrong]";
                  textDecoration = "underline decoration-[--color-wrong] underline-offset-1";
                }
              }
            }

            return (
              <span
                key={i}
                className={`transition-colors duration-100 text-[length:var(--typing-size)] ${color} ${textDecoration}`}
                style={{ textUnderlinePosition: 'under' }}
              >
                {char}
              </span>
            );
          })}
        </p>
      </div>

      <input
        type="text"
        value={inputValue}
        spellCheck={false}
        disabled={completed}
        onChange={handleInputChange}
        onPaste={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onKeyDown={handleKeyDown}
        placeholder="여기에 입력하세요"
        className="text-[length:var(--typing-size)] w-full outline-none select-none bg-inherit"
      />
    </div>
  );
};

export default TypingLocal;