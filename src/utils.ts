import { ISuperKey } from "./types";

export const getAutoIncId = (array: ISuperKey[], count?: number): number => {
  let id = count || array.length;

  if (!!array.find((item) => item.id === id)) {
    // console.log({ test: array.find((item) => item.id === id) });
    return getAutoIncId(array, id + 1);
  }

  return id || 1; // zero not allowed as id
};
