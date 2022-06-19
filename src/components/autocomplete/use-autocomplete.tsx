import { useCallback, useEffect, useRef, useState } from "preact/compat";
import { DEFAULT_VALUES, fireSubmitAction } from "./search-handler";
import browser from "webextension-polyfill";
import { ISuperKeyOptional } from "../../types";
import { ISuggestionsProps } from "./suggestions";

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

  const [value, setValue] = useState("");

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

  const handleChange = useCallback(
    (e: Event) => {
      const target = e.currentTarget as HTMLInputElement;
      const userInput = target.value;
      const filteredSuggestions: ISuperKeyOptional[] = suggestions?.filter(
        (suggestion: ISuperKeyOptional) =>
          suggestion.key &&
          suggestion.key.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      setActiveSuggestion(0);
      setFilteredSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setValue(target.value);
    },
    [setValue, suggestions]
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

  const onKeyDown = (e: KeyboardEvent) => {
    // User pressed the enter key
    if (e.code === "13") {
      if (activeSuggestion)
        // activeSuggestion == 0 should be the input value
        fireSubmitAction({
          keyItem: filteredSuggestions[activeSuggestion - 1],
        });
      else
        fireSubmitAction({
          value: (e.target as HTMLInputElement).value,
          keyItem: getByKey(value),
        });
    }
    // User pressed the up arrow
    if (e.code === "38") {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.code === "40") {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
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
