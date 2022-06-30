export const FIXED_KEYWORDS: { [index: string]: string } = {
  BOOKMARK: "@",
  HISTORY: "#",
};

export const isSearchingHistory = (input: string) =>
  input[0] === FIXED_KEYWORDS.HISTORY;
export const isSearchingBookmarks = (input: string) =>
  input[0] === FIXED_KEYWORDS.BOOKMARK;

export const getSearchType = (input: string) => {
  if (isSearchingHistory(input)) return "history";
  if (isSearchingBookmarks(input)) return "bookmark";

  return "key";
};
