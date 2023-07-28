// @ts-nocheck

import { IPFS_GATEWAY } from '@/components/constants'
import WatchMain from '@/components/WatchMain'
import { DISCOVER_VIDEOS } from '@/graphql/Queries'
import { apolloClient } from '@/graphql/appoloClient'
import { GET_POST_BY_ID } from '@/graphql/fragments/getPostById'
import Head from 'next/head'
import React from 'react'

export default function videoId({data, vidId, loading, error}) {

     
  return (
    <>
      <Head>
            <title>{data?.metadata?.content?.content?.title}</title>
            <meta name='description' content={data?.metadata?.content?.content?.description} />

              {/* Twitter */}
<meta name="twitter:card" content={data?.metadata?.content?.content?.title} key="twcard" />
<meta name="twitter:creator" content={`decentralized video sharing`} key="twhandle" />

{/* Open Graph */}
<meta property="og:url" content={`/watch/${vidId}`} key="ogurl" />
<meta property="og:image" content={`${IPFS_GATEWAY}${data?.metadata?.content?.content?.image}`} key="ogimage" />
<meta property="og:site_name" content={`Vito -  Decentralized video sharing Platform`} key="ogsitename" />
<meta property="og:title" content={data?.metadata?.content?.content?.title} key="ogtitle" />
<meta property="og:description" content={data?.metadata?.content?.content?.dscription} key="ogdesc" />
        </Head>
     
    <div className='   max-w-full bg-gray-900 min-h-screen'>
      <WatchMain  vidId={vidId} data={data} loading={loading} error ={error} />
    </div>
    
    </>
  )
}

export  async function getServerSideProps (context)  {
  const {videoId} = context.params
   const {data, loading, error, errors} = await apolloClient.query({
   query : DISCOVER_VIDEOS,
   variables : {
     //"postByIdId": videoId
     "where": {
        "address": {
          "_eq": videoId
        }
      }
   }
   })

   return{
     props : {
       data : data?.post[0],
       vidId : videoId,
       loading : loading,
       error : error || null
     }
   }
 }
