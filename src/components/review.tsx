import { CHROME_STORE_URL, FIREFOX_STORE_URL } from '../constants'
import { Icon } from '@iconify/react'
import { useFirefox } from './useFirefox'
import browser from 'webextension-polyfill'

const Review = () => {
 const { isFirefox } = useFirefox()

 return (
  <>
   {isFirefox !== 'unknown' && (
    <a
     target="_blank"
     className="ml-2 flex items-center"
     href={
      isFirefox ? FIREFOX_STORE_URL : CHROME_STORE_URL + browser.runtime.id
     }
     rel="noreferrer"
    >
     <span>⭐️ Please leave us a review on</span>
     <Icon
      icon={`logos:${isFirefox ? 'firefox' : 'chrome'}`}
      className="ml-2 text-xl"
     />
    </a>
   )}
  </>
 )
}

export default Review
