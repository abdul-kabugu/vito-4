// @ts-nocheck

import useTruncateText from '@/hooks/useTruncateText';
useTruncateText
import moment from 'moment';
import Link from 'next/link';
import React from 'react'
import { IPFS_GATEWAY } from '../constants';
import useGetProfileByAddress from '@/hooks/useGetProfileByAddress';
import Image from 'next/image';
// flex-grow flex-shrink w-[300px]  flex gap-2 items-center mb-2 relative
export default function RelatedVidCard({post}) {
  const {profile, isProfileLoading, isProfileError} = useGetProfileByAddress(post?.profile)

   const CREATORT_PROFILE = profile?.profile[0]
    console.log("profile data", CREATORT_PROFILE)
  
    const {shortenTxt} = useTruncateText()
    const currentDate = new Date();
    const postCreatedAt = new Date(post?.created_at);
    const diffInMilliseconds = currentDate - postCreatedAt;
const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
const duration = moment.duration(diffInHours, 'hours');
  return (
    <Link href={`/watch/${post?.address}`} className="text-gray-200">
        <div className='flex flex-col  border-t-0 sm:max-w-sm w-full rounded-xl h-60 border border-fuchsia-900/50 relative my-2 p-1 font-mono '>
          <img src={`${IPFS_GATEWAY}${post?.metadata?.content?.content?.image}`} className="w-full h-[75%] object-cover rounded-md"  />
            <div>
               <h1 className='font-mono text-base text-ellipsis mb-0'>{post?.metadata?.content?.content?.title&& shortenTxt(post?.metadata?.content?.content?.title, 23)}</h1>
                 <div className='flex mt-0.5 gap-2'>
                {CREATORT_PROFILE && <Image  src={`${CREATORT_PROFILE?.metadata?.avatar}`} width={300} height={300}  alt='profile' className='w-5 h-5 rounded-full'  /> }
               <h2 className='text-sm text-gray-500'>{CREATORT_PROFILE && shortenTxt(CREATORT_PROFILE?.metadata?.name, 17)}</h2>
               </div>
              <div className='flex gap-3 mt-0.5'>
              <p className='text-xs text-gray-500'>Likes 1</p>
              <p className='text-xs text-gray-500'>{duration.humanize().replace("a ", "")} ago</p>
              </div>
            </div>

             
    
        </div>
    </Link>
  )
}
