// @ts-nocheck

import React from 'react'

import { IPFS_GATEWAY } from '@/assets/constant';
import useTruncateText from '@/hooks/useTruncateText';
import Image from 'next/image';
export default function Banner({data, loading, error}) {
    const {shortenTxt} = useTruncateText()
    console.log("the user data", data)
   // const avatarUrl = data?.accountById?.profileSpace?.image

        if(loading) {
          return(
            <h1>Loading</h1>
          )
        }

         if(error) {
          return(
           <h1>error</h1>
          )
         }
  return (
    <div className='w-full '>
      <div className='bg-[url("https://c4.wallpaperflare.com/wallpaper/37/315/751/the-simpsons-homer-simpson-bart-simpson-wallpaper-thumb.jpg")] w-full h-44 mt-4 bg-center'></div><div className='mt-4 flex justify-between items-start px-4'>

        <div className='flex xs:gap-2 md:gap-4  items-center '>
          {/*
          <img src={`data:image/svg+xml;base64,${avatar}`} className=" xs:w-10 xs:h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 rounded-full" />
  */}
         <div className='w- h-12 bg-gray-700 rounded-full flex items-center justify-center'>
             <Image    src={`${data?.metadata?.avatar}`}  width={400} height={400} className='w-11 h-11 rounded-full' alt='profile'  />
         </div>
          <div>
            <h1 className=' mb-1 xs:text-lg  font-semibold xl:text-2xl capitalize'>{data?.metadata?.name}</h1>
            <h2 className='text-gray-400 md:font-semibold text-sm mt-0'> Followrs 2</h2>
          </div>

        </div>
        <button className='md:font-semibold bg-fuchsia-600 text-white xs:py-1 md:py-1.5 rounded-lg xs:px-2 md:px-3'>Follow</button>

      </div>
    </div>
  )
}
