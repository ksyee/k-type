// 디스플레이에 표시되는 문자의 색상 계산
export function calculateCharColors(
  sentence: string,
  inputValue: string,
  isDarkMode: boolean
): { newCharColors: string[]; newDisplayWord: string } {
  let newCharColors: string[] = [];
  if (isDarkMode) {
    newCharColors = Array(sentence.length).fill('white');
  } else {
    newCharColors = Array(sentence.length).fill('#999999');
  }
  const newDisplayWord = sentence.split('');

  for (let i = 0; i < sentence.length; i++) {
    const inputChar = inputValue[i];
    const targetChar = sentence[i];

    // 다크 모드일 때
    if (isDarkMode) {
      if (inputChar === targetChar) {
        newCharColors[i] = '#aaaaaa';
      }

      if (i < inputValue.length - 1) {
        if (inputChar === targetChar) {
          newCharColors[i] = '#aaaaaa';
        } else if (targetChar === ' ' && inputChar !== targetChar) {
          newCharColors[i] = 'red';
          newDisplayWord[i] = '_';
        } else {
          newCharColors[i] = 'red';
        }
      }
    } else {
      // 라이트 모드일 때
      if (inputChar === targetChar) {
        newCharColors[i] = '#555555';
      }

      if (i < inputValue.length - 1) {
        if (inputChar === targetChar) {
          newCharColors[i] = '#555555';
        } else if (targetChar === ' ' && inputChar !== targetChar) {
          newCharColors[i] = 'red';
          newDisplayWord[i] = '_';
        } else {
          newCharColors[i] = 'red';
        }
      }
    }
  }

  return { newCharColors, newDisplayWord: newDisplayWord.join('') };
}
