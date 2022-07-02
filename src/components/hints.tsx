import { Icon } from '@iconify/react'
import { FunctionComponent } from 'preact'
import { useCommand } from './useCommand'
import { Shortcuts } from './shortcuts'
import Review from './review'
import Social from './social'
import { useFirefox } from './useFirefox'
import { CHROME_SHORTCUT_GUIDE, FIREFOX_SHORTCUT_GUIDE } from '../constants'
import { useEffect } from 'preact/compat'
import browser from 'webextension-polyfill'

const Hints: FunctionComponent = () => {
 const { mainCommand } = useCommand()
 const { isFirefox } = useFirefox()

 const guideUrl = isFirefox ? FIREFOX_SHORTCUT_GUIDE : CHROME_SHORTCUT_GUIDE

 useEffect(() => {
  console.log({ sss: browser.runtime.id })
 }, [])

 return (
  <div>
   <div
    id="hint_modal"
    className="modal cursor-pointer"
    style={{
     '--tw-bg-opacity': '0.8',
    }}
   >
    <div className="modal-box relative bg-black">
     <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
      ✕
     </a>
     <h3 className="font-bold text-xl flex items-center">
      <Icon icon="akar-icons:triangle-alert" className="mr-2" /> Hints
     </h3>
     <div className="divider"></div>
     <ul>
      <li className="flex justify-between items-center">
       <p className="text-lg">Shortcut to open search popup:</p>{' '}
       <Shortcuts command={mainCommand} />{' '}
      </li>{' '}
      <li>
       <span
        onClick={() =>
         isFirefox
          ? window.open(guideUrl)
          : browser.tabs.create({
             url: guideUrl,
            })
        }
        className="link link-accent"
       >
        <em className="text-[12px]">
         {isFirefox
          ? 'Follow this guide to change browser shortcuts'
          : 'Change browser shortcut'}
        </em>
       </span>
      </li>
      <div className="divider"></div>
      <li className="flex justify-between items-center my-2">
       <p>Search History </p> Type <kbd className="kbd kbd-md ml-2">#</kbd>
      </li>{' '}
      <li className="flex justify-between items-center my-2">
       <p>Search Bookmarks</p> Type <kbd className="kbd kbd-md ml-2">@</kbd>
      </li>
     </ul>
     <div className="divider"></div>
     <Review />
     <br></br>
     <Social />
    </div>
   </div>
  </div>
 )
}

export default Hints
