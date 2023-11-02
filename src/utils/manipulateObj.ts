export const checkEmptyObj = (obj: object = {}) => !Object?.keys(obj)?.length;

export const checkEmptyAttrs = (obj: object = {}) =>
  Object.values(obj).some((v) => ![null, undefined].includes(v));

export const removeEmptyAttrs = (obj: Record<string, any>) =>
  Object.keys(obj).reduce(
    (acc, key: string) => ({
      ...acc,
      ...((obj[key] || obj[key] === 0) && { [key]: obj[key] }),
    }),
    {}
  );

export const checkKeyExist = (obj: object, key: string) =>
  Object?.keys(obj)?.includes(key);
