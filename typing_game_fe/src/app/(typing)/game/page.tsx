"use client";
import React, { useState, useEffect, useRef } from "react";
import typingKeys from "@/components/keyboard/typingKeys";
import Keyboard from "@/components/keyboard/Keyboard";
import { WORD_POOL } from "@/constant/wordpool";


const TyleLogo = () => (
  <svg 
    width="64" 
    height="64" 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mb-6 shadow-xl shadow-black/20 rounded-2xl"
  >
    {/* 배경 사각형 */}
    <rect width="64" height="64" rx="16" fill="black" />
    
    {/* 글자 T (Path로 그려서 폰트 의존성 제거) */}
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

const GAME_TIME = 1;

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
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                   <span className="text-3xl">🏆</span>
                </div>
                <span className="text-gray-400 text-sm mb-2 font-semibold tracking-widest uppercase">Result</span>
                <h2 className="text-6xl font-black mb-4 text-black tracking-tighter">
                  {score} <span className="text-2xl font-bold text-gray-400">pts</span>
                </h2>
                <p className="text-gray-500 mb-10 text-center leading-relaxed">
                  멋진 실력입니다!<br/>기록을 이미지로 저장해 보세요.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="font-liber font-bold text-2xl">GAME</div>
                <p className="text-gray-400 mb-10 font-light text-center leading-relaxed">
                  30초의 제한 시간 동안<br/>
                  최대한 많은 단어를 입력하세요.
                </p>
              </div>
            )}
            <div className="text-black font-liber font-bold text-2xl">START</div>

            <button 
              onClick={initGame}
              className="group relative px-14 py-5 bg-black text-white rounded-2xl text-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20"
            >
              <span className="relative z-10 font-liber font-bold text-2xl">
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

        <div className="mt-auto w-full border-t border-gray-100 pt-3">
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