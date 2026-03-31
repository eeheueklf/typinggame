"use client";

import React from "react";
import ReactDOM from "react-dom";
import { FiDownload, FiX } from "react-icons/fi";

interface ResultModalProps {
  lyrics: string | string[];
  accuracy: number;
  cpm: number;
  onRetry: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  lyrics,
  accuracy,
  cpm,
  onRetry,
}) => {
  const today = new Date();
  const date = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

  const saveAsImage = async () => {
    const element = document.getElementById("result");
    if (!element) return;

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(element, { scale: 2 });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "result.png";
    link.click();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9] animate-fadeIn">
      <div
        id="result"
        className="relative bg-[#ffffff] w-[310px] max-w-[380px] p-[1.3rem_2rem_2rem_2rem] rounded-[4px] shadow-[0_10px_25px_rgba(0,0,0,0.6)] animate-[fadeIn_0.1s_ease-out]"
      >
        <div className="flex gap-[10px] justify-end items-center text-[#292929]">
          <button onClick={saveAsImage} className="text-[1rem] cursor-pointer">
            <FiDownload />
          </button>
          <button onClick={onRetry} className="text-[1rem] cursor-pointer">
            <FiX />
          </button>
        </div>

        <div className="font-liber font-bold">TYLE</div>

        <div className="text-[1rem] leading-normal">{lyrics}</div>

        <p className="text-[0.9rem] my-[0.3rem]">{date}</p>

        <div className="flex flex-wrap gap-[12px] justify-start">
          <div className="text-[0.85rem] font-medium text-black">정확도 {accuracy}%</div>
          <div className="text-[0.85rem] font-medium text-black">평균 {cpm}타</div>
        </div>
      </div>

    </div>,
    document.body
  );
};

export default ResultModal;