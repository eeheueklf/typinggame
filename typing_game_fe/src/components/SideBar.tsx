"use client";

import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { LongText } from "@/types/long-text";
import { ItemContext } from "@/features/typing/long/components/ItemContext";

interface SidebarProps {
  lyricsList: LongText[];
  isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ lyricsList, isLoggedIn }) => {
  const { selectedText, setSelectedText } = useContext(ItemContext);
  const [showUpload, setShowUpload] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const buffer = reader.result as ArrayBuffer;
        const text = new TextDecoder("utf-8").decode(buffer);
        setFileContent(text);
      } catch {
        setError("텍스트 디코딩에 실패했습니다.");
      }
    };
    reader.onerror = () => setError("파일을 읽는 중 오류가 발생했습니다.");
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = () => {
    if (!fileContent.trim() || !fileName?.trim()) {
      setError("내용이 비어 있습니다.");
      return;
    }

    const baseTitle =
      (fileName?.replace(/\.[^.]+$/, "") || `내 파일 ${fileName.length + 1}`).trim() ||
      `내 파일 ${fileName.length + 1}`;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    axios.post(
      `${baseUrl}/my-long-text`,
      { title: baseTitle, content: (fileContent || "") },
      { withCredentials: true }
    )
    .then(() => window.location.reload())
    .catch(console.error);

    setShowUpload(false);
    setFileName(null);
    setFileContent("");
  };

  const handleDelete = (longTextId: number) => {
    if (!confirm("정말 이 파일을 삭제하시겠습니까?")) return;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    axios.delete(`${baseUrl}/my-long-text/${longTextId}`, { withCredentials: true })
    .then(() => window.location.reload())
    .catch(console.error);
  };

  return (
    <aside className="fixed top-0 left-0 w-[240px] h-screen z-[5] p-[10px] hidden lg:block">
      <div className="flex flex-col">
        <div className="block max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
          {[...lyricsList].map((song, index) => {
            const title = song.title;
            const longTextId = song.longTextId;
            const isSelected =
              selectedText?.longTextId === longTextId &&
              selectedText?.title === title;

            const isFirstUserFile = song.isUserFile && !lyricsList.slice(0, index).some(s => s.isUserFile);
            const isLastUserFile = song.isUserFile && !lyricsList.slice(index + 1).some(s => s.isUserFile);

            return (
              <React.Fragment key={`${index}`}>
                {isFirstUserFile && (
                  <hr className="my-4 mx-4 w-[120px] border-0 border-t border-dashed border-[#8c8c8c] border-b border-b-[#d8d3d3ff]" />
                )}
                
                <a
                  className={`block p-[0.45rem] px-4 mt-1 mb-1 rounded-[0.3rem] text-[0.875rem] leading-[1.25rem] flex-shrink-0 cursor-pointer w-[150px] overflow-hidden whitespace-nowrap text-ellipsis transition-colors
                    ${isSelected 
                      ? 'text-black bg-transparent hover:bg-[#ededed]' 
                      : 'text-gray-400 hover:text-[--color-correct]'}`}
                  onClick={() => setSelectedText(song)}
                >
                  {title}
                </a>

                {(isLastUserFile && selectedText?.isUserFile) && (
                  <button 
                    className="m-4 mt-4 mb-2 text-black cursor-pointer text-[0.75rem] hover:text-[--progress-fill] text-left"
                    onClick={() => handleDelete(song.longTextId)}
                  >
                    삭제하기
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <button 
          className="text-black my-[10px] mx-auto mb-2 cursor-pointer pl-4 text-[0.75rem] hover:text-[--progress-fill] text-left w-full transition-colors"
          onClick={() => setShowUpload(s => !s)}
        >
          {showUpload ? 'x' : '+add'}
        </button>

        {showUpload && (
          <div className="w-[80%] mx-4 p-4 rounded-[0.5rem] text-[0.875rem] border border-gray-400 bg-white">
            <label 
              htmlFor="sidebar-file-input"
              className="block w-full text-center cursor-pointer py-1 rounded-full mb-2 hover:bg-[--progress-fill] transition-colors border border-transparent hover:text-white"
            >
              {fileName ? `선택됨: ${fileName.slice(0, 10)}...` : 'TXT 파일 선택'}
            </label>
            <input
              id="sidebar-file-input"
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="flex gap-2 mb-2">
              <button 
                className="flex-1 bg-[--progress-fill] text-white py-1 rounded-md hover:bg-[--color-correct] transition-colors"
                onClick={handleUpload}
              >
                업로드
              </button>
            </div>

            <input
              type="text"
              value={fileName || ""}
              onChange={e => setFileName(e.target.value)}
              className="w-full text-black h-[25px] border border-gray-200 px-2 mb-2 text-xs outline-none"
              placeholder="제목"
            />
            
            <textarea
              id="paste-area"
              value={fileContent}
              onChange={e => setFileContent(e.target.value)}
              rows={10}
              className="w-full text-black h-[40px] border border-gray-200 px-2 text-xs resize-none outline-none scrollbar-hide"
              placeholder="텍스트 붙여넣기"
            />
            
            {fileContent && (
              <p className="text-[10px] text-gray-500 mt-1">줄 수: {fileContent.split(/\r?\n/).length}</p>
            )}
            {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;