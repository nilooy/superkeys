import { DEFAULT_VALUES } from "./search-handler";
import browser from 'webextension-polyfill'

const style = {
  activeItem: "bg-gray-800 text-white",
  item: `px-4 py-3 focus text-sm text-gray-200 cursor-pointer hover:bg-gray-600`,
  list: `shadow-xl absolute top-full left-0 right-0 border w-auto md:max-w-full overflow-y-auto max-h-80 mt-2 p-3 z-20`,
};

const Suggestions = ({
  activeSuggestion,
  filteredSuggestions = [],
  suggestions = [],
  showSuggestions,
  value,
  onSuggestionClick,
}) => {
  if (!showSuggestions || !value) return null;

  // TODO: Apply dry principle: ref: `getByKey` function
  const showTypedValue = filteredSuggestions?.[0]?.key !== value;

  const keyFromValue = value.split(DEFAULT_VALUES.separator)?.[0];
  const keyToFind = suggestions.find((item) => item?.key === keyFromValue);
  const searchValue = keyToFind
    ? value.replace(`${keyToFind.key}${DEFAULT_VALUES.separator}`, "")
    : "";

  // No sub query found and matched with key with space, can trigger search query
  const showSearchMessageUrl =
    !filteredSuggestions.length && keyToFind?.queryUrl && keyToFind?.url;

  console.log({ showTypedValue, keyToFind, showSearchMessageUrl });

  return (
    <div>
      {showSearchMessageUrl ? (
        <div className="text-sm text-gray-500 p-4">
          <span className="p-2 pt-10 text-gray-500 ">
            <span className="text-gray-300">
              {searchValue.substring(0, 35)}
              {searchValue?.length > 35 ? "..." : ""}
            </span>{" "}
            Search on {showSearchMessageUrl}
          </span>
        </div>
      ) : (
        ""
      )}
      {filteredSuggestions.length ? (
        <ul className={style.list}>
          {showTypedValue && (
            <li
              className={
                activeSuggestion === 0
                  ? `${style.item} ${style.activeItem}`
                  : style.item
              }
              onClick={() => onSuggestionClick(value)}
            >
              {value}
              {showSearchMessageUrl ? `Search on ${showSearchMessageUrl}` : ""}
            </li>
          )}
          {filteredSuggestions.map((suggestion, i) => {
            let className;
            const index = i + 1;

            if (index === activeSuggestion) {
              className = `${style.item} ${style.activeItem}`;
            }

            if (index !== activeSuggestion) {
              className = style.item;
            }

            return (
              <li
                className={className}
                key={suggestion.key}
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion.key} {suggestion.url}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-sm text-gray-500 p-4">
          <em>No suggestions available! </em>
          <span
            className="ml-2 badge badge-accent badge-outline text-xs cursor-pointer hover:bg-accent hover:text-gray-100 hover:border-none"
            onClick={() =>
              window.open(
                browser.runtime.getURL(
                  "features/options/index.html#add-key-modal"
                )
              )
            }
          >
            Add new keys
          </span>{" "}
          Or Search
        </div>
      )}
    </div>
  );
};

export default Suggestions;
