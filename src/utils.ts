import { ISuperKeyOptional } from "./types";

export const getAutoIncId = (
  array: ISuperKeyOptional[],
  count?: number
): number => {
  let id = count || array.length;

  if (!!array.find((item) => item.id === id)) {
    return getAutoIncId(array, id + 1);
  }

  return id || 1; // zero not allowed as id
};
