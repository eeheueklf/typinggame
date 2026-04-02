import { calculateTotalChars, calculateCpm, calculateCorrectCount, calculateAccuracy} from '@/utils/typingUtils';

describe('타이핑 시스템 핵심 로직 검증 (Unit Test)', () => {
  
  describe('calculateTotalChars (자모음 분리 계산)', () => {
    test('"맑은"이 7타로 계산되어야함 (겹받침)' , () => {
      const result = calculateTotalChars("맑은");
      expect(result).toBe(7);
    });
    test('"까마귀"가 7타로 계산되어야함 (쌍자음, 이중모음)' , () => {
      const result = calculateTotalChars("까마귀");
      expect(result).toBe(7);
    });
    test('공백과 문장 부호가 포함된 문장', () => {
      const result = calculateTotalChars("안녕! 하세요");
      expect(result).toBe(14);
    });
  });

  describe('calculateCpm  (분당 타수 계산)', () => {
    test('1분(60000ms) 동안 100자', () => {
      const startTime = Date.now() - 60000;
      const result = calculateCpm(100, startTime);
      expect(result).toBe(100);
    });

    test('2분(120000ms) 동안 1000자', () => {
      const startTime = Date.now() - 120000;
      const result = calculateCpm(1000, startTime);
      expect(result).toBe(500);
    });
  });

  test('빈 문자열 입력 시 0을 반환하는가 (예외 처리)', () => {
    expect(calculateTotalChars("")).toBe(0);
  });
  
  test('정확도 계산 함수가 올바른 퍼센트를 반환하는가', () => {
    expect(calculateAccuracy(80, 100)).toBe(80);
    expect(calculateAccuracy(0, 0)).toBe(0);
  });

  test('글자 비교 함수가 틀린 글자를 정확히 거르는가', () => {
    expect(calculateCorrectCount("사과", "사람")).toBe(1);
    expect(calculateCorrectCount("맑음", "맊음")).toBe(1);
  });

});

