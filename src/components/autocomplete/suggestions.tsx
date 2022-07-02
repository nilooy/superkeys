import { DEFAULT_VALUES } from './search-handler'
import browser from 'webextension-polyfill'
import { FunctionComponent } from 'preact'
import { ISuperKeyOptional } from '../../types'
import { listItemType, searchHelperText } from './suggestions-item'
import { getSearchType } from './helpers'

const style = {
 activeItem: 'bg-gray-800 text-white',
 item: `px-4 py-3 focus text-sm text-gray-200 cursor-pointer hover:bg-gray-600`,
 list: `shadow-xl top-full left-0 right-0 border w-auto md:max-w-full overflow-y-auto max-h-80 mt-2 p-3 z-20`,
}

export interface ISuggestionsProps {
 activeSuggestion: number
 filteredSuggestions: ISuperKeyOptional[]
 suggestions: ISuperKeyOptional[]
 showSuggestions: boolean
 value: string
 onSuggestionClick: (keyItem: object | string) => void
 onKeyDown: any
}

const Suggestions: FunctionComponent<ISuggestionsProps> = ({
 activeSuggestion,
 filteredSuggestions = [],
 suggestions = [],
 showSuggestions,
 value,
 onSuggestionClick,
 onKeyDown,
}) => {
 if (!showSuggestions || !value) return null

 const keyFromValue = value.split(DEFAULT_VALUES.separator)?.[0]
 const keyToFind = suggestions.find(item => item?.key === keyFromValue)
 const searchValue = keyToFind
  ? value.replace(`${keyToFind.key}${DEFAULT_VALUES.separator}`, '')
  : ''

 // No sub query found and matched with key with space, can trigger search query
 const showSearchMessageUrl: any =
  !filteredSuggestions.length && keyToFind?.queryUrl && keyToFind?.url

 const searchType = getSearchType(value)

 const helperText = searchHelperText[searchType]?.(showSearchMessageUrl, value)

 return (
  <div>
   {showSearchMessageUrl ? (
    <div className="text-sm text-gray-500 p-4">
     <span className="p-2 pt-10 text-gray-500 ">
      <span className="text-gray-300">
       {searchValue.substring(0, 35)}
       {searchValue?.length > 35 ? '...' : ''}
      </span>{' '}
      Search on {showSearchMessageUrl}
     </span>
    </div>
   ) : (
    ''
   )}
   {filteredSuggestions.length ? (
    <ul className={style.list}>
     {!!helperText && (
      <li
       className={
        activeSuggestion === 0
         ? `${style.item} ${style.activeItem}`
         : style.item
       }
       onClick={() => onSuggestionClick(value)}
      >
       {helperText}
      </li>
     )}
     {filteredSuggestions.map((suggestion, i) => {
      let className
      const index = i + 1

      if (index === activeSuggestion) {
       className = `${style.item} ${style.activeItem}`
      }

      if (index !== activeSuggestion) {
       className = style.item
      }

      const ItemByType = listItemType[suggestion.type || 'key'] || <></>

      return (
       <li
        className={className}
        key={suggestion.key}
        onClick={() => onSuggestionClick(suggestion)}
       >
        <ItemByType suggestion={suggestion} />
       </li>
      )
     })}
    </ul>
   ) : (
    <div className="text-sm text-gray-500 p-4">
     <em>No {searchType === 'key' ? 'suggestion' : searchType} available! </em>
     <span
      className="ml-2 badge badge-accent badge-outline text-xs cursor-pointer hover:bg-accent hover:text-gray-100 hover:border-none"
      onClick={() =>
       window.open(
        browser.runtime.getURL('dist/options/index.html#add-key-modal'),
       )
      }
     >
      Add new keys
     </span>{' '}
     Or Search
    </div>
   )}
  </div>
 )
}

export default Suggestions
