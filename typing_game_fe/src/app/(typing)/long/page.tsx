"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/SideBar";
import Typing from "@/features/typing/long/components/Typing";
import Keyboard from "@/features/keyboard/Keyboard";
import typingKeys from "@/features/keyboard/typingKeys";
import { useAuth } from "@/hooks/useAuth";
import { LongText } from "@/types/long-text";
import { useLongTexts } from "@/features/typing/long/hooks/useLongTexts";
import { ItemContext } from "@/features/typing/long/components/ItemContext";


const TypingPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const lyricsList = useLongTexts();
  const [selectedText, setSelectedText] = useState<LongText | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  useEffect(() => {
    if (lyricsList.length > 0 && !selectedText) setSelectedText(lyricsList[0]);
  }, [lyricsList, selectedText]);

  return (
    <ItemContext.Provider value={{ selectedText, setSelectedText }}>
      <div className="relative flex items-center h-full w-full overflow-hidden justify-center">
        
        {isSidebarOpen && (
          <div className="absolute left-0 top-0 h-full z-20">
            <Sidebar
              lyricsList={lyricsList}
              isLoggedIn={isLoggedIn}
            />
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="w-[--tpg-basic-width]">
            
            <div className="flex justify-between w-full px-[2px] text-[length:var(--tpg-header-font-size)] font-nanum font-bold">
              <h1 className="mb-2">긴글연습</h1>
              <h1 className="mb-2">
                {selectedText ? `〈${selectedText.title}〉` : "선택된 글이 없습니다."}
              </h1>
            </div>

            <div className="w-full">
              {selectedText ? (
                <div className="w-full">
                  <Typing
                    longTextId={selectedText.longTextId ?? 0}
                    isUserFile={selectedText.isUserFile ?? false}
                  />
                </div>
              ) : (
                <div className="w-full h-[370px] flex flex-col">
                  <div className="h-[2px] bg-[--progress-bg] mb-6" />
                  
                  <div className="flex-1 flex flex-col justify-center items-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/30">
                    <h2 className="text-[1.2rem] mb-2 text-gray-400 font-semibold">
                      아직 선택된 글이 없습니다.
                    </h2>
                    <p className="text-[0.9rem] text-gray-400">
                      왼쪽 사이드바에서 연습할 글을 선택해주세요!
                    </p>
                  </div>
                  <div className="h-[40px]" />
                </div>
              )}
            </div>

            <Keyboard keys={typingKeys} onToggleSidebar={toggleSidebar} />
          </div>
        </div>
      </div>
    </ItemContext.Provider>
  );
};

export default TypingPage;