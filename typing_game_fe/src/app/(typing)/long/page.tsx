"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/features/SideBar";
import TypingCore from "@/features/typing"; 
import Keyboard from "@/features/keyboard/Keyboard";
import typingKeys from "@/features/keyboard/typingKeys";
import { useAuth } from "@/hooks/useAuth";
import { ItemContext } from "@/features/typing/long/components/ItemContext";
import TypingLayout from "@/features/typing/layout";
import { LongText } from "@/types/long-text";

import { LONG_TEXTS } from "@/constant/longtexts";
import { LONG_TEXT_CONTENT } from "@/constant/longtext";

const TypingPage = () => {
  const { isLoggedIn } = useAuth();
  const lyricsList = LONG_TEXTS;

  const [selectedText, setSelectedText] = useState<LongText | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  useEffect(() => {
    if (lyricsList.length > 0 && !selectedText) setSelectedText(lyricsList[0]);
  }, [lyricsList, selectedText]);

  const currentData = selectedText ? LONG_TEXT_CONTENT[selectedText.longTextId] : null;

  return (
    <ItemContext.Provider value={{ selectedText, setSelectedText }}>
      <TypingLayout
        title="긴 글 연습"
        subTitle={selectedText ? `〈${selectedText.title}〉` : "- 선택된 글 없음"}
        sidebar={
          isSidebarOpen && (
            <Sidebar lyricsList={lyricsList} isLoggedIn={isLoggedIn} />
          )
        }
        keyboard={<Keyboard keys={typingKeys} onToggleSidebar={toggleSidebar} />}
      >
        {selectedText && currentData ? (
          <TypingCore
            key={selectedText.longTextId}
            mode="long"
            data={currentData}
            longTextId={selectedText.longTextId}
            isUserFile={selectedText.isUserFile ?? false}
          />
        ) : (
          <div className="w-full h-[370px] flex flex-col justify-center items-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/30 font-pretendard">
            <h2 className="text-[1.2rem] mb-2 text-gray-400 font-semibold">
              {selectedText ? "본문 데이터를 불러올 수 없습니다." : "아직 선택된 글이 없습니다."}
            </h2>
            <p className="text-[0.9rem] text-gray-400">
              {selectedText ? "데이터 구성을 확인해주세요." : "왼쪽 사이드바에서 연습할 글을 선택해주세요!"}
            </p>
          </div>
        )}
      </TypingLayout>
    </ItemContext.Provider>
  );
};

export default TypingPage;