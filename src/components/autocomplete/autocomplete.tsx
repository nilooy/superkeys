import Suggestions from "./suggestions";
import { useAutocomplete } from "./use-autocomplete";
import { FunctionComponent } from "preact";

const style: { default: string; disabled: string; label: string } = {
  label: `text-gray-700`,
  disabled: `cursor-not-allowed`,
  default: `input input-bordered w-[600px] shadow-lg`,
};

export const Autocomplete: FunctionComponent = () => {
  const {
    activeSuggestion,
    filteredSuggestions,
    suggestions,
    showSuggestions,
    handleChange,
    onKeyDown,
    value,
    onSuggestionClick,
  } = useAutocomplete();

  return (
    <div className="relative">
      <input
        autoComplete="off"
        autoFocus={true}
        className={style.default}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        value={value}
        name="search"
        placeholder="Search"
      />
      <Suggestions
        {...{
          activeSuggestion,
          filteredSuggestions,
          showSuggestions,
          value,
          onSuggestionClick,
          suggestions,
        }}
      />
    </div>
  );
};
