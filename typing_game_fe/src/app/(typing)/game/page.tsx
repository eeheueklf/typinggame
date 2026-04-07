"use client";
import React, { useState, useEffect, useRef } from "react";
import typingKeys from "@/components/keyboard/typingKeys";
import Keyboard from "@/components/keyboard/Keyboard";
import { WORD_POOL } from "@/constant/wordpool";

export const TyleKeyLogo = () => (
  <div className="w-14 h-14 bg-[--key-fill-default] border-2 border-black rounded-lg flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-default">
    <span className="text-3xl font-black text-black">T</span>
  </div>
);
const TyleLogo = () => (
  <svg 
    width="64" 
    height="64" 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mb-6 shadow-xl shadow-black/20 rounded-2xl"
  >
    <rect width="64" height="64" rx="16" fill="black" />
    
    <path 
      d="M20 20H44V26H35V44H29V26H20V20Z" 
      fill="white" 
    />
  </svg>
);

interface GameWord {
  id: number;
  text: string;
  isCleared: boolean;
}

const GAME_TIME = 30;

const TypingGame: React.FC = () => {
  const [words, setWords] = useState<GameWord[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [isGameActive, setIsGameActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initGame = () => {
    const shuffledPool = [...WORD_POOL].sort(() => Math.random() - 0.5);
    const gameWordsCount = Math.min(WORD_POOL.length, 100);
    
    const initialWords = shuffledPool.slice(0, gameWordsCount).map((word, i) => ({
      id: i,
      text: word,
      isCleared: false,
    }));

    setWords(initialWords);
    setScore(0);
    setTimeLeft(GAME_TIME);
    setIsGameActive(true);
    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isGameActive, timeLeft]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (e.key === "Enter") {
      const trimmedInput = inputValue.trim();
      if (!trimmedInput) return;

      const targetIndex = words.findIndex(w => !w.isCleared && w.text === trimmedInput);

      if (targetIndex !== -1) {
        const newWords = [...words];
        newWords[targetIndex].isCleared = true;
        setWords(newWords);
        setScore((prev) => prev + 1); 
        setInputValue("");
      } else {
        setInputValue("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-pretendard bg-gray-50/30">
      <div className="relative w-[600px] h-[560px] flex-shrink-0 flex flex-col rounded-[2.5rem] overflow-hidden p-10 transition-none">
        {!isGameActive && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-500">
            {timeLeft === 0 ? (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <span className="text-gray-400 text-sm mb-2 font-semibold tracking-widest uppercase">Result</span>
                <h2 className="text-6xl font-black mb-4 text-black tracking-tighter">
                  {score} <span className="text-2xl font-bold text-gray-400">pts</span>
                </h2>
                <p className="text-gray-500 mb-10 text-center leading-relaxed">
                  멋진 실력입니다!
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <TyleKeyLogo/>
                <p className="text-gray-400 mb-10 font-light text-center leading-relaxed">
                  30초의 제한 시간 동안<br/>
                  최대한 많은 단어를 입력하세요.
                </p>
              </div>
            )}

          <button 
            onClick={initGame}
            className="group relative px-10 py-3.5 bg-black text-white rounded-xl text-lg font-bold transition-all active:scale-95 shadow-lg shadow-black/10"
          >
            <span className="relative z-10 font-bold text-lg tracking-tight">
              {timeLeft === GAME_TIME ? "START" : "다시 도전하기"}
            </span>
          </button>
          </div>
        )}

        <div className={`flex flex-col transition-all duration-700 ${!isGameActive ? "blur-md opacity-20 scale-95" : "blur-0 opacity-100 scale-100"}`}>
          {/* Header: 정보 가독성 강화 */}
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-1">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-400 font-bold">Time Remaining</p>
              <p className={`text-4xl font-black tabular-nums ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-black"}`}>
                {timeLeft}<span className="text-xl ml-1">s</span>
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gray-400 font-bold">Current Score</p>
              <p className="text-4xl font-black tabular-nums text-black">{score}</p>
            </div>
          </div>

        {/* 단어장 */}
        <div className="flex flex-wrap gap-1 justify-center content-start">

        {words.map((word) => {
            const isMatching = !word.isCleared && inputValue && word.text.startsWith(inputValue);
            return (
            <div 
                key={word.id} 
                className={`
                flex-grow text-center text-[1.1rem] 
                transition-all duration-200 pointer-events-none
                
                ${word.isCleared ? "opacity-0 scale-75" : "opacity-100 scale-100"}
                ${isMatching ? "text-blue-500 font-bold border-blue-500" : "text-gray-800 border-transparent"}
                `}
            >
                {word.text}
            </div>
            );
        })}
  
        <div className="flex-grow-[100] invisible" />
        </div>

        <div className="mt-auto w-full pt-3">
        <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!isGameActive}
            placeholder={isGameActive ? "이곳에 입력하세요..." : ""}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            spellCheck={false}
            autoFocus
            className="w-full bg-transparent text-center text-xl font-bold text-black placeholder-gray-300 outline-none"
        />
        </div>
        </div>
        
      </div>

    </div>
  );
};

export default TypingGame;