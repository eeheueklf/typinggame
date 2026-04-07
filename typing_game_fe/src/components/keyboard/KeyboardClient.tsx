"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Keys } from "@/types/key-item";

interface KeyboardProps {
  keys: Keys;
  onToggleSidebar?: () => void;
}

export default function KeyboardClient({ keys, onToggleSidebar }: KeyboardProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = document.querySelector(`.key--${e.code}`);
      if (key) key.classList.add("pressed");
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = document.querySelector(`.key--${e.code}`);
      if (key) key.classList.remove("pressed");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="w-full">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-full">
          {row.map(({ code, label, color, widthLevel, href }) => {
            const handleClick = () => {
              if (code === "CapsLock") onToggleSidebar?.();
              if (code === "Backspace") toggleTheme();
            };

            // 가로 너비 로직
            const widthClass = 
              widthLevel === 3 ? "w-[120px] flex-grow-0" :
              widthLevel === 2 ? "w-[90px] flex-grow-0" :
              widthLevel === 1 ? "w-[70px] flex-grow-0" :
              widthLevel === 0 ? "flex-grow" : "w-[50px] flex-grow-0";

            // 배경색 및 테두리 로직
            const colorClass = 
              color === 'blue' ? "bg-[--key-fill-blue] text-white" :
              color === 'red' ? "bg-[--key-fill-red] text-white" :
              "bg-[--key-fill-default] text-black";

            // 공통 스타일 (Hover, Pressed 효과 포함)
            const commonClasses = `
              h-[55px] m-[2px] text-[13px] rounded-[4px] flex justify-center items-start border border-black transition-all
              hover:text-[--key-led-red] hover:bg-[--key-linked-pressed]
              hover:shadow-[0_0_5px_1px] 
              ${color === 'blue' ? 'hover:shadow-[--key-led-blue]' : 'hover:shadow-[--key-led-red]'}
              [&.pressed]:text-[--key-led-red] [&.pressed]:bg-[--key-linked-pressed]
              [&.pressed]:shadow-[0_0_5px_1px]
              ${color === 'blue' ? '[&.pressed]:shadow-[--key-led-blue]' : '[&.pressed]:shadow-[--key-led-red]'}
              ${widthClass} ${colorClass}
            `;

            const keyElement = (
              <div
                key={code}
                className={`key--${code} ${commonClasses} cursor-pointer`}
                onClick={handleClick}
              >
                <div className="w-[99%] h-[90%] p-[6px] leading-none">
                  {label}
                </div>
              </div>
            );

            return href ? (
              <Link href={href} key={code} className={widthLevel === 0 ? "flex-grow" : ""}>
                {keyElement}
              </Link>
            ) : (
              keyElement
            );
          })}
        </div>
      ))}
    </div>
  );
}