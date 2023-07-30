// @ts-nocheck

import { IPFS_GATEWAY } from '../constants';
import React from 'react'
import {Player} from '@livepeer/react'
import Image from 'next/image';
export default function FullVideoCard({video}) {

  const PosterImage = () => {
    return (
      <Image
        src={`${IPFS_GATEWAY}${video?.metadata?.content?.content?.image}`}
        layout="fill"
        objectFit="cover"
        priority
       // placeholder="blur"
        alt='video cover'
      />
    );
  };
  return (
    <div className='flex w-[96vw] md:w-[95vw] lg:w-[94vw] xl:w-[73vw] border-t-0   rounded-xl  border border-fuchsia-900/40 justify-center cursor-pointer self-center'>
  
  <Player
      title="Waterfalls"
      playbackId={video?.metadata?.content?.content?.video}
      loop
      autoPlay
      showTitle={false}
      
      poster={<PosterImage />}
    />
    </div>
  )
}
