"use client";
import React, { useState, useEffect, useRef } from "react";
import typingKeys from "@/components/keyboard/typingKeys";
import Keyboard from "@/components/keyboard/Keyboard";
import { WORD_POOL } from "@/constant/wordpool";


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
    const gameWordsCount = Math.min(WORD_POOL.length, 200);
    
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
    <div className="flex flex-col items-center w-[--tpg-basic-width] font-pretendard">
      {/* Game Header */}
      <div className="w-full flex justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-[0.8rem] text-gray-500">Time</span>
          <strong className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-500" : "text-black"}`}>
            {timeLeft}s
          </strong>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[0.8rem] text-gray-500">Score</span>
          <strong className="text-2xl font-bold text-black">{score}</strong>
        </div>
      </div>

      <div className="relative w-full h-[20rem] overflow-hidden flex flex-col">
        {!isGameActive && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md transition-all duration-500">
            {timeLeft === 0 ? (
              // 종료 화면
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <span className="text-gray-400 text-sm mb-1 font-medium">GAME OVER</span>
                <h2 className="text-5xl font-black mb-2 text-black tracking-tighter">
                  {score} <span className="text-xl font-bold text-gray-600">Points</span>
                </h2>
                <p className="text-gray-500 mb-8 text-sm text-center">
                  정말 멋진 실력이네요!<br/>기록을 경신해볼까요?
                </p>
              </div>
            ) : (
              // 시작 화면
              <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-black/20">
                  <span className="text-white text-3xl font-bold">T</span>
                </div>
                <h1 className="text-3xl font-black mb-2 tracking-tight text-black text-center">TYLE Typing Practice</h1>
                <p className="text-gray-500 mb-8 text-sm font-light text-center">
                  30초 동안 얼마나 많은 단어를 타이핑할 수 있나요?<br/>
                  엔터키를 눌러 단어를 제출하세요.
                </p>
              </div>
            )}
            
            <button 
              onClick={initGame}
              className="group relative px-12 py-4 bg-black text-white rounded-2xl text-lg font-bold overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-2xl shadow-black/10"
            >
              <span className="relative z-10">
                {timeLeft === GAME_TIME ? "Challenge Start" : "Try Again"}
              </span>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                →
              </div>
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-1 justify-start content-start flex-1 w-full">
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

      <div className="mt-8">
        <Keyboard keys={typingKeys} />
      </div>
    </div>
  );
};

export default TypingGame;