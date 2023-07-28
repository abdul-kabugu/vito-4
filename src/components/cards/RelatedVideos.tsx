// @ts-nocheck

import { useDiscoverVideos } from '@/hooks'
import React from 'react'
import RelatedVidCard from './RelatedVideoCard'
// xs:hidden xl:block
export default function RelatedVideos() {
    const {posts, isPostsLoading, isPostsError} = useDiscoverVideos()
   // const filteredPosts = posts?.posts?.filter(post => post.hasOwnProperty("image") && post.image !== null)

  return (
    <div className='xs:hidden xl:block'>
       {posts?.post?.map((post, i) =>  {

        return(
             <RelatedVidCard key={i} post = {post} />
        )
       })}
    </div>
  )
}
