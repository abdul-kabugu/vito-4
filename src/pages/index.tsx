// @ts-nocheck

import styles from '@/styles/Home.module.css'
import { UserPostsDisplay } from '@/components/UserPosts'
import { MyProfile } from '@/components/MyProfile'
import { useDiscoverVideos } from '@/hooks'
import Head from 'next/head'
import { VideoCard } from '@/components/cards'
function Home() {
   const {posts, isPostsError, isPostsLoading} = useDiscoverVideos()

    console.log("posts from home", posts)
  return (
    <>
       <Head>
        <title>Browse | Vito</title>
        <meta name="keywords" content="decentralized video sharing platform, gum network, video sharing, social media, community-driven platform, social-Fi, deFi, polkadot social, subsocial network"/>
        <meta name="description" content="Frentube | Decentralized Video Sharing Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
  </Head>
      <main className={``}>
        <div className='flex  xs:flex-col md:flex-row flex-wrap gap-3 md:pt-3 bg-gray-900 min-h-screen'>
           {posts?.post?.map((video, i) => {

            return(
               <VideoCard key={i} video={video} />
            )
           })}
        </div>
      </main>
      </>
  )
}

export default Home;