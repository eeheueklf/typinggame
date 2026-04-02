import * as Hangul from "hangul-js";

// 자음 모음 분리
export const calculateTotalChars = (text: string): number => {
  return Hangul.disassemble(text, true).flat().length;
};

// cpm 계산
export const calculateCpm = (totalChars: number, startTime: number): number => {
  const timeTaken = Date.now() - startTime;
  if (timeTaken <= 0) return 0;
  return Math.round(totalChars / (timeTaken / 60000));
};

// 일치하는 글자 수
export const calculateCorrectCount = (input: string, target: string): number => {
  let correct = 0;
  const length = Math.min(input.length, target.length);
  for (let i = 0; i < length; i++) {
    if (input[i] === target[i]) correct++;
  }
  return correct;
};

// 정확도 계산
export const calculateAccuracy = (correct: number, total: number): number => {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
};