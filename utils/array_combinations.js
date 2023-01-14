/* Utility for finding all combinations of specified size in an array 
Based on https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/*/

/* recursive function to find all combinations */
function findCombsRecursively(
    arr, tempData, start, end, index, r, combinationArray
) {
  if (index === r) {
    const combination = [];
    for (let j = 0; j < r; j++) {
      combination.push(tempData[j]);
    }
    combinationArray.push(combination);
  }

  for (let i = start; i <= end && end - i + 1 >= r - index; i++) {
    tempData[index] = arr[i];
    findCombsRecursively(
      arr, tempData, i + 1, end, index + 1, r, combinationArray
    );
  }
}

/* calculates the specified number of combinations of elements in an array */
function getCombinations(array, numOfCombinations) {
  // A temporary array to store all combinations one by one
  let tempData = new Array(numOfCombinations);
  let combinationArray = [];

  findCombsRecursively(
    array, tempData, 0, array.length - 1, 0, numOfCombinations, combinationArray
  );
  return combinationArray;
}

export default { getCombinations };
