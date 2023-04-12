export function replaceItemInArray(arr, originalItem, newItem) {
  return arr.map((elem) => {
    if (elem !== originalItem) {
      return elem;
    }

    return newItem;
  });
}
