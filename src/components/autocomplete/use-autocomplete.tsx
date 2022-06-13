import { useCallback, useEffect, useRef, useState } from "preact/compat";
import { DEFAULT_VALUES, fireSubmitAction } from "./search-handler";
import browser from 'webextension-polyfill'

export const useAutocomplete = () => {
  const ref = useRef(null);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    browser.storage.sync.get(null).then(
        (items) => {
          if (items) {
            const withSubKeys = Object.values(items);

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
        }
    );
  }, []);

  const [value, setValue] = useState("");

  //close suggestions list when click outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!showSuggestions) return;
        setShowSuggestions(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [showSuggestions, ref]);

  const handleChange = useCallback(
    (e) => {
      const userInput = e.currentTarget.value;
      const filteredSuggestions: [] = suggestions?.filter(
        (suggestion) =>
          suggestion.key.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      setActiveSuggestion(0);
      setFilteredSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setValue(e.currentTarget.value);
    },
    [setValue, suggestions]
  );

  const getByKey = (keyValue) => {
    const keyFromValue = keyValue.split(DEFAULT_VALUES.separator)?.[0];
    const keyToFind = suggestions?.find((item) => item?.key === keyFromValue);

    console.log({ keyFromValue, keyToFind, keyValue });

    let searchValue = keyValue.replace(
      `${keyToFind.key}${DEFAULT_VALUES.separator}`,
      ""
    );

    return keyToFind
      ? {
          ...keyToFind,
          searchValue: searchValue !== keyValue ? searchValue : "",
        }
      : null;
  };

  const onSuggestionClick = (keyItem) => {
    fireSubmitAction({
      keyItem: typeof keyItem === "object" ? keyItem : getByKey(value),
      value,
    });
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      if (activeSuggestion)
        // activeSuggestion == 0 should be the input value
        fireSubmitAction({
          keyItem: filteredSuggestions[activeSuggestion - 1]
        });
      else
        fireSubmitAction({ value: e.target.value, keyItem: getByKey(value) });
    }
    // User pressed the up arrow
    if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
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
