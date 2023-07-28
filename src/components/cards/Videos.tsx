// @ts-nocheck

import {useState, useEffect} from 'react'
import {VideoCard} from '../cards'
import Image from 'next/image'
import { useGumContext } from '@gumhq/react-sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
export default function Videos({channelId}) {
    const wallet = useWallet();
    const { sdk } = useGumContext();
    const [userPosts, setUserPosts] = useState<any[]>([]);
  
    useEffect(() => {
      if (wallet.connected) {
        fetchUserPosts();
      }
    }, [wallet.connected, sdk, wallet.publicKey]);

    const fetchUserPosts = async () => {
        const posts = await sdk.post.getPostsByAuthority(wallet.publicKey as PublicKey);
        //const postWithProfiles = await Promise.all(posts.map(fetchProfileForPost));
        //setUserPosts(postWithProfiles);
        setUserPosts(posts)
      };
      const filteredPosts = userPosts?.filter(post =>  post?.metadata?.app_id === "vito_1" )

        console.log("user posts", filteredPosts)
   /*if(filteredPosts?.length < 1 || !filteredPosts){
    return(
      <div className='flex items-center justify-center flex-col gap-2'>
        <Image src='/img/empty.svg' className='w-[150px] rounded-full' alt='empty image' width={200} height={200} />
         <h2 className=' font-bold'>No Results Found</h2>
      </div>
    )
  }*/
  return (
    <div className='flex gap-3 flex-wrap items-center  mt-5 '>
        {filteredPosts?.map((item, i) =>  {

            return(
                <VideoCard key={i}  video ={item}  />
            )
        })}
    </div>
  )
}
