import Suggestions from './suggestions'
import { useAutocomplete } from './use-autocomplete'
import { FunctionComponent } from 'preact'
import { useCommand } from '../useCommand'
import { Shortcuts } from '../shortcuts'

const style: { default: string; disabled: string; label: string } = {
 label: `text-gray-700`,
 disabled: `cursor-not-allowed`,
 default: `input input-bordered min-w-[600px] w-full shadow-lg`,
}

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
  onMouseover,
 } = useAutocomplete()

 const { mainCommand } = useCommand()

 return (
  <div className="relative">
   <div className="relative">
    <input
     autoComplete="off"
     autoFocus={true}
     className={style.default}
     onChange={handleChange}
     onKeyDown={onKeyDown}
     value={value}
     name="search"
     placeholder={`Search `}
    />
    {mainCommand && !value && (
     <p className="absolute right-2 top-2 text-gray-500">
      <Shortcuts size="sm" command={mainCommand} />
     </p>
    )}
   </div>
   <Suggestions
    {...{
     activeSuggestion,
     filteredSuggestions,
     showSuggestions,
     value,
     onSuggestionClick,
     suggestions,
     onMouseover,
    }}
   />
  </div>
 )
}
