import { useCallback, useEffect, useRef, useState } from "preact/compat";
import { DEFAULT_VALUES, fireSubmitAction } from "./search-handler";
import browser from "webextension-polyfill";
import { ISuperKeyOptional } from "../../types";
import { ISuggestionsProps } from "./suggestions";
import { isSearchingBookmarks, isSearchingHistory } from "./helpers";

export const useAutocomplete = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    ISuperKeyOptional[]
  >([]);

  const [suggestions, setSuggestions] = useState<ISuperKeyOptional[]>([]);

  useEffect(() => {
    browser.storage.sync.get(null).then((items) => {
      if (items) {
        const withSubKeys: ISuperKeyOptional[] = Object.values(items);

        withSubKeys.forEach((item) => {
          if (item?.subKeys?.length)
            withSubKeys.push(
              ...item?.subKeys.map((sk) => ({
                ...sk,
                key: `${item.key} ${sk.key}`,
                parentKey: item.key,
              }))
            );
        });

        setSuggestions(withSubKeys);
      }
    });
  }, []);

  const [value, setValue] = useState<string>("");

  //close suggestions list when click outside
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (!ref.current?.contains(event.target as HTMLInputElement)) {
        if (!showSuggestions) return;
        setShowSuggestions(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [showSuggestions, ref]);

  const bookmarkSearch = browser.bookmarks.search;
  const bookmarkRecent = browser.bookmarks.getRecent;
  const browserHistorySearch = browser.history.search;

  const handleChange = useCallback(
    async (e: Event) => {
      const target = e.currentTarget as HTMLInputElement;
      const userInput = target.value?.toLowerCase();
      let newFilteredSuggestions: ISuperKeyOptional[] = [];

      if (isSearchingBookmarks(userInput)) {
        const stringWithoutAtKeyword = userInput?.substring(1);
        let bookmarkResult = [];

        if (stringWithoutAtKeyword)
          bookmarkResult = await bookmarkSearch(stringWithoutAtKeyword);
        else bookmarkResult = await bookmarkRecent(10);

        newFilteredSuggestions = bookmarkResult
          .filter((each) => each.type === "bookmark")
          .map((each) => {
            return {
              key: each.id,
              url: each.url,
              type: each.type,
              title: each.title || "",
            };
          });
      } else if (isSearchingHistory(userInput)) {
        const stringWithoutHashKeyword = userInput?.substring(1);
        const historyResult = await browserHistorySearch({
          text: stringWithoutHashKeyword || " ",
          maxResults: 20,
        });

        newFilteredSuggestions = historyResult
          .sort((a, b) => (a.lastVisitTime || 0) - (b.lastVisitTime || 0))
          .map((each) => {
            return {
              key: each.id,
              url: each.url,
              type: "history",
              title: each.title || "",
            };
          });
      } else
        newFilteredSuggestions = suggestions
          ?.filter(
            (suggestion: ISuperKeyOptional) =>
              suggestion.key &&
              suggestion.key.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          )
          .map((each: ISuperKeyOptional) => ({ ...each, type: "key" }));

      setActiveSuggestion(0);
      setFilteredSuggestions(newFilteredSuggestions);
      setShowSuggestions(true);
      setValue(userInput);
    },
    [
      setValue,
      setFilteredSuggestions,
      bookmarkSearch,
      bookmarkRecent,
      browserHistorySearch,
      suggestions,
    ]
  );

  const getByKey = (keyValue: string): ISuperKeyOptional | null => {
    const keyFromValue = keyValue.split(DEFAULT_VALUES.separator)?.[0];
    const keyToFind = suggestions?.find((item) => item?.key === keyFromValue);

    let searchValue = keyValue.replace(
      `${keyToFind?.key}${DEFAULT_VALUES.separator}`,
      ""
    );

    return keyToFind
      ? {
          ...keyToFind,
          searchValue: searchValue !== keyValue ? searchValue : "",
        }
      : null;
  };

  const onSuggestionClick: ISuggestionsProps["onSuggestionClick"] = (
    keyItem
  ) => {
    fireSubmitAction({
      keyItem: typeof keyItem === "object" ? keyItem : getByKey(value),
      value,
    });
  };
  // (e.target as HTMLInputElement).value

  const keyBoardEvents: any = {
    Enter: (value: string): any =>
      activeSuggestion
        ? // activeSuggestion == 0 should be the input value
          fireSubmitAction({
            keyItem: filteredSuggestions[activeSuggestion - 1],
          })
        : fireSubmitAction({
            value,
            keyItem: getByKey(value),
          }),
    ArrowUp: () =>
      activeSuggestion && setActiveSuggestion(activeSuggestion - 1),
    ArrowDown: () =>
      activeSuggestion - 1 !== filteredSuggestions.length &&
      setActiveSuggestion(activeSuggestion + 1),
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keyCode: string = e.code;
    const { value } = e.target as HTMLInputElement;

    keyBoardEvents[keyCode]?.(value);
  };

  return {
    activeSuggestion,
    filteredSuggestions,
    suggestions,
    showSuggestions,
    handleChange,
    onKeyDown,
    onSuggestionClick,
    value,
  };
};
