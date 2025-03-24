import { disassembleHangul } from 'es-hangul';
import { calculateCharColors } from './colorUtil';

/**
 * 현재 입력된 텍스트와 목표 문장을 비교하여 정확도를 계산합니다.
 * 빨간색(오타) 글자 수를 전체 문장 길이로 나누어 정확도를 계산합니다.
 * @param input 사용자가 입력한 텍스트
 * @param target 목표 문장
 * @returns 정확도 (0-100)
 */
export const calculateAccuracy = (input: string, target: string): number => {
  if (input.length === 0) return 100;

  // 색상 정보를 통해 오타 수 계산
  const { newCharColors } = calculateCharColors(target, input);
  const redCount = newCharColors.filter((color) => color === 'red').length;

  // 전체 문장 길이 대비 정확도 계산 (100%에서 오타율 차감)
  return Math.max(0, Math.round(100 - (redCount / target.length) * 100));
};
