
// @ts-nocheck


import { AppLogo,  } from '@/Icons'
import React from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import Search from './Search'
import Profile from './Profile'
import { useToggleSidebar} from '@/store/toggleState'
export default function TopNav() {
  const {toggleSidebar, isSidebarExpanded} = useToggleSidebar()
  return (
    <div className='h-[60px] flex justify-between items-center px-3 border-b-2 border-gray-800 sticky  top-0 bg-black z-10'> 
     <div className='flex gap-4 items-center'>
      <AiOutlineMenu size={23} className='cursor-pointer xs:hidden md:block text-gray-300' onClick={toggleSidebar} />
       <div>
       
        <AppLogo className='w-7 text-blue-500 ' />
        </div> 
     

      </div>
       <Search />
       <Profile  />
      </div>
  )
}

