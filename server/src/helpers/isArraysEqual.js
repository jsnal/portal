export default function isArraysEqual(array1, array2) {
  if (array1.length !== array2.length || array1 == null || array2 == null) {
    return false;
  }

  for (let i = array1.length; i--;) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}
