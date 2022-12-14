function findCombinations(arr, tempData, start, end, index, r, combinationArray) {
  if (index == r) {
    const combination = [];
    for (let j = 0; j < r; j++) {
      combination.push(tempData[j]);
    }
    combinationArray.push(combination)
  }

  for (let i = start; i <= end && end - i + 1 >= r - index; i++) {
    tempData[index] = arr[i];
    findCombinations(arr, tempData, i + 1, end, index + 1, r, combinationArray);
  }
}

function getArrayElementsCombs(arr, combSize) {
  // A temporary array to store all combination one by one
  let tempData = new Array(combSize);
  let combinationArray = []

  // Print all combination using temporary array 'data[]'
  findCombinations(arr, tempData, 0, arr.length - 1, 0, combSize, combinationArray);
  return combinationArray;
}

export default {getArrayElementsCombs}
