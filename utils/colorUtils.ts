// 디스플레이에 표시되는 문자의 색상 계산
export function calculateCharColors(
  sentence: string,
  inputValue: string
): { newCharColors: string[]; newDisplayWord: string } {
  const newCharColors = Array(sentence.length).fill('white');
  const newDisplayWord = sentence.split('');

  for (let i = 0; i < sentence.length; i++) {
    const inputChar = inputValue[i];
    const targetChar = sentence[i];

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
  }

  return { newCharColors, newDisplayWord: newDisplayWord.join('') };
}
