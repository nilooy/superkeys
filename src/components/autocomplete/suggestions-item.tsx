import { FunctionComponent } from 'preact'
import { ISuperKeyOptional } from '../../types'

export const listItemType: {
 [index: string]: FunctionComponent<{ suggestion: ISuperKeyOptional }>
} = {
 bookmark: ({ suggestion }) => (
  <>
   <span>{suggestion.title}</span> {': '}
   <br />
   <span className="text-gray-400">
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/*@ts-ignore*/}
    {suggestion?.url?.length >= 90
     ? `${suggestion.url?.substring(0, 90)}...`
     : suggestion.url}
   </span>
  </>
 ),
 history: ({ suggestion }) => (
  <>
   <span>{suggestion.title}</span> {': '}
   <br />
   <span className="text-gray-400">{suggestion.url}</span>
   <span className="text-gray-400">
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/*@ts-ignore*/}
    {suggestion?.url?.length >= 90
     ? `${suggestion.url?.substring(0, 90)}...`
     : suggestion.url}
   </span>
  </>
 ),
 key: ({ suggestion }) => (
  <>
   <span>{suggestion.key}</span> {': '}
   <span className="text-gray-400">{suggestion.url}</span>
  </>
 ),
}

export const searchHelperText = {
 bookmark: (value: string) => (
  <>
   <span className="text-green-500">@Bookmarks Search </span>

   {` ${value ? value.substring(1, 35) : ''}`}
   {value?.length > 35 ? '...' : ''}
  </>
 ),
 history: (value: string) => (
  <span>
   <span className="text-green-400">#History Search </span>

   {` ${value ? value.substring(1, 35) : ''}`}
   {value?.length > 35 ? '...' : ''}
  </span>
 ),
}

export const searchHelperQueryString = (
 showSearchMessageUrl: any,
 value: string,
) => {
 return (
  !!showSearchMessageUrl && (
   <>
    <span className="text-green-500">Search on</span>{' '}
    <span>{showSearchMessageUrl}</span>: {value.substring(0, 35)}
    {value?.length > 35 ? '...' : ''}
   </>
  )
 )
}
