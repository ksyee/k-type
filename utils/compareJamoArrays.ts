import { JamoArray } from '@/types/globalTypes';

export const compareJamoArrays = (
  inputArr: JamoArray,
  targetArr: JamoArray
) => {
  try {
    console.log('inputArr', inputArr);
    console.log('targetArr', targetArr);

    if (inputArr.length === 0) {
      return 'white';
    }

    for (let i = 0; i < inputArr.length; i++) {
      if (inputArr[i] !== targetArr[i]) {
        return 'red';
      }
    }

    // return isMatched ? 'gray' : 'red';
    return 'gray';
  } catch (error) {
    console.log(error);
    return 'red';
  }
};
