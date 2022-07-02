import { SuperkeysTextLogo } from '../components/superkeys-text-logo'

const Navbar = () => {
 return (
  <div className="navbar bg-base-100 shadow-xl rounded-box mb-10">
   <div className="flex-1">
    <a
     href="https://www.superkeys.app"
     target="_blank"
     rel="noreferrer"
     className="flex items-center btn btn-ghost normal-case text-3xl italic"
    >
     <img
      className="w-[40px] mr-1"
      src="/assets/img/logo128.png"
      alt="superkey_logo"
     />
     <SuperkeysTextLogo className="mt-1" width={150} />
    </a>
   </div>
   <div className="flex-none gap-2">
    <a href="#hint_modal" className="btn btn-outline modal-button ml-12">
     Hints
    </a>
    <a className="btn" href="#">
     Key Lists
    </a>
    <a className="btn" href="#import">
     Import
    </a>
   </div>
  </div>
 )
}

export default Navbar
