import { ISuperKeyOptional } from './types'
import browser from 'webextension-polyfill'

export const getAutoIncId = (
 array: ISuperKeyOptional[],
 count?: number,
): number => {
 const id = count || array.length

 if (array.find(item => item.id === id)) {
  return getAutoIncId(array, id + 1)
 }

 return id || 1 // zero not allowed as id
}

export const checkFirefoxBrowser = async (): Promise<boolean> => {
 const { name } = (await browser.runtime.getBrowserInfo?.()) || {}
 return name === 'Firefox'
}
