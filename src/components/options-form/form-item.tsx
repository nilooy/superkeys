import { Icon } from '@iconify/react/dist/iconify'
import { getUniqueKey } from '../helper'
import Form, { IFormProps } from './form'
import { FunctionComponent } from 'preact'

interface IFormItemProps extends IFormProps {
 setSelectedIds: (ids: (ids: string[]) => string[]) => void | string[]
 selectedIds: string[]
}

export const FormItem: FunctionComponent<IFormItemProps> = ({
 id,
 tabIndex = 0,
 key,
 separator,
 url,
 queryUrl,
 querySeparator,
 subKeys,
 checkedOption,
 setCheckedOption,
 setKeyLists,
 keyLists,
 setSelectedIds,
 selectedIds,
}) => {
 const uniqueKey = getUniqueKey(key, id)
 const isOpen = checkedOption === uniqueKey

 const onCheckboxChange = (e: Event) => {
  if ((e?.target as HTMLInputElement).checked)
   setSelectedIds((ids: string[]) => [...ids, uniqueKey])
  else setSelectedIds(ids => ids.filter(id => id !== uniqueKey))
 }

 return (
  <div className="flex items-center">
   <label className="mr-2">
    <input
     type="checkbox"
     className={`checkbox checkbox-accent`}
     disabled={isOpen}
     onChange={onCheckboxChange}
     checked={selectedIds.includes(uniqueKey)}
    />
   </label>
   <div
    className={`text-primary-content border rounded-md bg-neutral border-gray-600 my-1 w-full ${
     isOpen ? 'shadow-lg shadow-gray-500/20' : ''
    }`}
   >
    <button
     onClick={() =>
      isOpen ? setCheckedOption?.('') : setCheckedOption?.(uniqueKey)
     }
     className={`flex justify-between items-center w-full ${
      isOpen ? 'bg-gray-600' : ''
     }`}
    >
     <span className="bg-gray-700 text-gray-300 p-2 text-lg font-bold">
      {key}
     </span>
     <span className="ml-3">
      {url}
      {subKeys?.length ? (
       <span className="ml-2 badge badge-accent">
        {subKeys?.length} Subkeys
       </span>
      ) : (
       ''
      )}
      {queryUrl ? (
       <span className="ml-2 badge badge-success text-gray-700">
        Searchable
       </span>
      ) : (
       ''
      )}
     </span>

     <Icon
      icon="akar-icons:chevron-up"
      className={`text-md text-gray-400 transition duration-75 mr-2 ${
       isOpen ? '' : 'rotate-180'
      }`}
     />
    </button>
    {isOpen && (
     <Form
      {...{
       id,
       tabIndex,
       key,
       separator,
       url,
       queryUrl,
       querySeparator,
       subKeys,
       setKeyLists,
       keyLists,
       setCheckedOption,
       checkedOption,
      }}
     />
    )}
   </div>
  </div>
 )
}
