export const getUniqueArray = <T = string>(
  array: T[],
  removeUndefined?: boolean
) => {
  const unique = [...new Set(array)];
  if (!removeUndefined) return unique;

  return unique.filter((elm) => ![null, undefined].includes(elm));
};
