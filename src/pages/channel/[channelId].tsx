// @ts-nocheck

import Banner from '@/components/cards/Banner'
import UserVideos from '@/components/UserVideos'
import { apolloClient } from '@/graphql/appoloClient'
import { GET_PROFILE_BY_ADDRESS, GET_PROFILE_BY_NAME } from '@/graphql/Queries'
import Head from 'next/head'
import React from 'react'

export default function channelId({data, userId, loading, error}) {
    console.log("the data from channel", data)
  return (
    <>
     <Head>
      <title>
      {data?.metadata?.name || "Vito" }
     </title>
            <meta name='description' content={data?.metadata?.bio} />

              {/* Twitter */}
<meta name="twitter:card" content={`FrenTube`} key="twcard" />
<meta name="twitter:creator" content={data?.metadata?.name|| "Vito" } key="twhandle" />

{/* Open Graph */}
<meta property="og:url" content={`/channels/${channelId}`} key="ogurl" />
<meta property="og:image" content={`/img/banner.png`} key="ogimage" />
<meta property="og:site_name" content={`Poltube -  Decentralized video shring platform`} key="ogsitename" />
<meta property="og:title" content= {data?.accountById?.profileSpace?.name  || data?.accountById?.profileSpace?.handle || data?.accountById?.profileSpace?.username || "FrenTube" } key="ogtitle" />
<meta property="og:description" content={"vito -  Decentralized video  sharing platform"} key="ogdesc" />
     </Head>
    <div className=' max-w-full md:min-w-[95vw] min-h-screen bg-gray-900/50 '>
       <Banner data = {data} loading = {loading}  error = {error} />  
       <UserVideos channelId = {channelId} /> 
    </div>
    </>
  )
}


export  async function getServerSideProps (context)  {
  const {channelId} = context.params
   const {data, loading, error} = await apolloClient.query({
   query : GET_PROFILE_BY_NAME,
   variables : {
    "where": {
        "metadata": {
          "_contains": {
            "name" : channelId
          }
        }
      }
   }
   })

   return{
     props : {
       data : data?.profile[0],
       userId : channelId, 
       loading : loading,
      
     }
   }
 }


