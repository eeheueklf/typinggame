// components/ResultModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useScores } from "@/features/typing/long/useScores";

interface ResultModalProps {
  accuracy: number;
  cpm: number;
  elapsedTime: number;
  totalChars: number;
  correctChars: number;
  lineCount: number;
  onRetry: () => void;
  longTextId:number;
  isUserFile:boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({
  accuracy,
  cpm,
  elapsedTime,
  totalChars,
  correctChars,
  lineCount,
  onRetry,
  longTextId,
  isUserFile = false,
}) => {
  const [mounted, setMounted] = useState(false);

  const { score, fetchScore} = useScores(longTextId, isUserFile);
  

  useEffect(() => {
    fetchScore();
    setMounted(true);
    return () => setMounted(false);
  }, []);
  const authHeader = typeof window !== "undefined" ? sessionStorage.getItem("authHeader") || "" : "";
  


  // 점수 기록하기
  const handleRecord = async (e: React.FormEvent) => {
     e.preventDefault();
    console.log("점수 기록 요청..."); 
    if(isUserFile){
      try{
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/my-long-text/${longTextId}/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
           Authorization: authHeader,
        },
        body: JSON.stringify({
          score : cpm,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("응답 데이터:", data);
      alert("점수 기록 성공!");
      onRetry();
      } catch (error) {
        console.error("점수 기록 실패", error);
        alert("점수 기록에 실패했습니다.");
      }
    }else{
  try{
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/long-text/${longTextId}/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
           Authorization: authHeader,
        },
        body: JSON.stringify({
          score : cpm,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("응답 데이터:", data);
      alert("점수 기록 성공!");
      onRetry();
    } catch (error) {
      console.error("점수 기록 실패", error);
      alert("점수 기록에 실패했습니다.");
    }    
    }
  };

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <Backdrop>
      <ModalBox>
        <CloseButton onClick={onRetry}>×</CloseButton>
        <ResultStats>
          <StatBox>정확도 {accuracy}%</StatBox>
          <StatBox>평균 {cpm}타</StatBox>
          <StatBox>시간 {(elapsedTime / 1000).toFixed(1)}초</StatBox>
        </ResultStats>
        <p>🎉 타자 연습 완료!</p>
        {accuracy===100 && (
        <RecordButton onClick={handleRecord}><p>📍 내 타수 기록하기</p></RecordButton>
        )}
        <p>*정확도 100%시 기록 가능</p>
        <h2>이전 최고 기록 : {score}타 </h2>
        <br />
        <p>줄 수: {lineCount}줄</p>
        <p>글자 수: {correctChars} / {totalChars}자</p>
      </ModalBox>
    </Backdrop>,
    document.body
  );
};

export default ResultModal;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 20px;
  font-size: 1.5rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const RecordButton = styled.button`
  cursor: pointer;
  
  &:hover {
    color: var(--progress-fill);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 더 진하게 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;

const ModalBox = styled.div`
position: relative;
  background: #ffffffff;
  padding: 2rem;
  border-radius: 4px;
  max-width: 380px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.1s ease-out;

  h2 {
    margin-top: 0.8rem;
    margin-bottom: 0.3rem;
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 0.9rem;
    // color: #bbb;
    margin: 0.3rem 0;
  }

  @keyframes fadeIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;

const ResultStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 1.5rem 0 1.2rem 0;
  justify-content: center;
`;

const StatBox = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
`;

