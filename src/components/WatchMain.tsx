//@ts-nocheck

import React from 'react'
import { FullVideoCard } from './cards'
import Image from 'next/image'
import FullVideoCardFooter from './cards/FullVideoFooter'
import { PublicKey } from '@solana/web3.js'
import RelatedVideos from './cards/RelatedVideos'
import useGetProfileByAddress from '@/hooks/useGetProfileByAddress'
import { Profile } from '@gumhq/ui-components'
import Link from 'next/link'
import VideoFullSkeleton from './Loder/VideoFullSkeleton'
export default function WatchMain({vidId, data, loading, error}) {
  const {profile, isProfileLoading, isProfileError} = useGetProfileByAddress(data?.profile)
  const CREATORT_PROFILE = profile?.profile[0]
    console.log("creator profile", CREATORT_PROFILE)
    console.log("data", data)

      if(loading){
        return(
          <VideoFullSkeleton   />
        )
      }
  return (
    <div className='flex gap-2 text-gray-300'>
    <div className='xl:w-[73vw]'>
        <FullVideoCard  video={data}  />

         <div className='my-4'>
            <h1 className='text-xl font-thin capitalize'>{data?.metadata?.content?.content?.title}</h1>
     <div className='flex justify-between items-center'>
             <div className='flex gap-2'>
              <Link href={`/channel/${CREATORT_PROFILE?.metadata?.name}`}>
               <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gray-700' >
             <img  src={`${CREATORT_PROFILE?.metadata?.avatar}`}  alt='profile' className='w-9 h-9 rounded-full'  />
             </div>
             </Link>
             <div>
                 <p className='text-lg font-thin capitalize'>{CREATORT_PROFILE?.metadata?.name}</p>
                  <p className='text-sm text-gray-400'>3 Followers</p>
             </div>
             </div>
             <button className='py-1.5 xs:px-4 xl:px-6 rounded-lg bg-fuchsia-600 font-thin '>Follow</button>
             </div> 

            <div>
          <FullVideoCardFooter  video={data} />
        </div>  
         </div>

          
    </div>
    <RelatedVideos   />
    </div>
  )
}
