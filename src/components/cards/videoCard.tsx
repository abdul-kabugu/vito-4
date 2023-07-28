// @ts-nocheck
import {useState} from 'react'
import Image from 'next/image'
import { IPFS_GATEWAY } from '../constants'
import { PublicKey } from "@solana/web3.js";
import useTruncateText from '@/hooks/useTruncateText';
import moment from 'moment';
import { AiOutlineFieldTime } from 'react-icons/ai';
import Link from 'next/link';
import useGetProfileByAddress from '@/hooks/useGetProfileByAddress';
export default function VideoCard({video}) {
    console.log("video from its file", video)
     const {profile, isProfileLoading, isProfileError} = useGetProfileByAddress(video?.profile)
  const {shortenTxt} = useTruncateText()
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date();
  const videoCreatedAt = new Date(video?.refreshed_at);  
  const diffInMilliseconds = currentDate - videoCreatedAt;
  const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
  const duration = moment.duration(diffInHours, 'hours'); 

  const CREATORT_PROFILE = profile?.profile[0]

  return (
    <div className='xs:w-full md:w-[340px] lg:w-[320px]'>
        <div className='md:max-h-[210px] rounded-md '>
          <Link href={`watch/${video?.address}`}>
       <Image  src={`${IPFS_GATEWAY}${video?.metadata?.content?.content?.image}`} width={1200} height={600} alt='video cover' className='rounded-xl'    /> 
       </Link>
       </div>
       <div className='flex gap-2 my-2'>
         <Link href={`/channel/${CREATORT_PROFILE?.metadata?.name}`}>
         <div className='w-8 h-8 rounded-full flex items-center justify-center bg-gray-700' >
             <img  src={`${CREATORT_PROFILE?.metadata?.avatar}`}  alt='profile' className='w-7 h-7 rounded-full'  />
         </div>
         </Link>
          <div>
               <h1 className='text-lg font-thin mb-0'> { video?.metadata?.content?.content?.title && shortenTxt( video?.metadata?.content?.content?.title, 30)}</h1>
                <div className='flex gap-1 items-center '>
                  <AiOutlineFieldTime   className='w-3.5 h-3.5 text-gray-500'   />
               <p className=' text-gray-500 text-sm'>{duration.humanize().replace("a ", "")} ago</p>
               </div>

          </div>
       </div>
    </div>
  )
}
