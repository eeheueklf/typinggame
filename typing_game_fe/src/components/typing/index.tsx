'use client';

import React, { useState, useEffect, useMemo } from "react";
import ResultModal from "@/components/ResultModal";
import QuoteSkeleton from "@/components/Skeleton/QuoteSkeleton";
import { 
  calculateTotalChars, 
  calculateCpm, 
  calculateCorrectCount, 
  calculateAccuracy 
} from "@/features/typing/typingUtils";
import { useTypingAudio } from "@/features/typing/useTypingAudio";

interface TypingCoreProps {
  mode: 'short' | 'long';
  data: string[]; 
  longTextId?: number;
  isUserFile?: boolean;
}

const TypingCore: React.FC<TypingCoreProps> = ({ mode, data, longTextId, isUserFile }) => {
  const [mounted, setMounted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const [stats, setStats] = useState({
    cpm: 0,
    correctChars: 0,
    totalChars: 0
  });

  const { playSound } = useTypingAudio();

  const currentLine = data[currentIdx] || "";
  const nextLines = mode === 'long' ? data.slice(currentIdx + 1, currentIdx + 3) : [];

  const totalTypedChars = useMemo(() => {
    const pastLinesContent = data.slice(0, currentIdx).join("");
    const pastChars = calculateTotalChars(pastLinesContent);
    const currentChars = calculateTotalChars(inputValue);
    return pastChars + currentChars;
  }, [inputValue, currentIdx, data]);

  const totalDataChars = useMemo(() => calculateTotalChars(data.join("")), [data]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (startTime === null && !completed) setStartTime(Date.now());

    if (e.key === " ") {
      playSound('space');
    } else if (e.key === "Backspace") {
      playSound('backspace');
    }

    if (e.key === "Enter") {
      if (inputValue.length === currentLine.length) {
        const now = Date.now();
        const timeTaken = now - (startTime || now);
        
        const correct = calculateCorrectCount(inputValue, currentLine);
        setStats(prev => ({
          ...prev,
          correctChars: prev.correctChars + correct,
          totalChars: prev.totalChars + currentLine.length
        }));
        setElapsedTime(prev => prev + timeTaken);

        if (mode === 'long' && currentIdx < data.length - 1) {
          setCurrentIdx(prev => prev + 1);
          setInputValue("");
          setStartTime(null);
        } else {
          setCompleted(true);
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue !== inputValue && newValue.slice(-1) !== " ") {
      playSound('normal');
    }
    setInputValue(newValue);
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setInputValue("");
    setStartTime(null);
    setElapsedTime(0);
    setCompleted(false);
    setStats({ cpm: 0, correctChars: 0, totalChars: 0 });
  };

  useEffect(() => {
    if (startTime === null || completed) return;

    const interval = setInterval(() => {
      const totalTime = elapsedTime + (Date.now() - startTime);
      setStats(prev => ({
        ...prev,
        cpm: calculateCpm(totalTypedChars, totalTime)
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, totalTypedChars, elapsedTime, completed]);

  useEffect(() => {
    setMounted(true);
    handleRetry();
  }, [data]);

  if (!mounted) return <QuoteSkeleton />;

  const accuracy = calculateAccuracy(stats.correctChars, stats.totalChars);

  return (
    <div className="h-[370px] w-[--tpg-basic-width] font-pretendard">
      {completed && (
        <ResultModal
          lyrics={data.join("\n")}
          accuracy={accuracy}
          cpm={stats.cpm}
          onRetry={handleRetry}
          longTextId={longTextId}
          isUserFile={isUserFile}
        />
      )}

      <div className="h-[2px] bg-[--progress-bg] mb-2">
        <div
          className="h-full bg-[--key-fill-red] transition-[width] duration-300 ease-out"
          style={{ width: `${(totalTypedChars / totalDataChars) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-end mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-[--color-basic] font-medium tracking-tighter">
            {stats.cpm}CPM
          </span>
        </div>
        <div className="text-xs text-[--color-basic] opacity-60">
          {totalTypedChars} / {totalDataChars} 자
        </div>
      </div>

      <div className="min-h-[300px] w-full flex flex-col overflow-hidden">
        <p className="mb-4 w-full text-[length:var(--typing-size)] leading-normal font-medium">
          {currentLine.split("").map((char, i) => {
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
                className={`transition-colors duration-100 ${color} ${textDecoration}`}
                style={{ textUnderlinePosition: 'under' }}
              >
                {char}
              </span>
            );
          })}
        </p>

        {mode === 'long' && nextLines.map((line, idx) => (
          <p key={idx} className="text-[length:var(--typing-size)] text-[--color-basic] opacity-30 mb-2 leading-normal">
            {line}
          </p>
        ))}
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
        placeholder={completed ? "연습 완료" : "여기에 입력하세요"}
        className="text-[length:var(--typing-size)] w-full outline-none select-none bg-inherit"
        autoFocus
      />
    </div>
  );
};

export default TypingCore;