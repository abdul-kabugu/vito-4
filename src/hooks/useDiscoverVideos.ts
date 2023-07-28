
import {useState, useEffect, useContext} from 'react'
import {useQuery} from '@apollo/client'
import { DISCOVER_VIDEOS } from '@/graphql/Queries'



  const  useDiscoverVideos = () =>  {
   const {data : posts , loading : isPostsLoading, error: isPostsError } = useQuery(DISCOVER_VIDEOS, {
    variables : {
        "where": {
            "metadata": {
              "_contains": {
                "app_id" : "vito_1"
              }
            }
          }
    },
    pollInterval: 500,
   })

   return{
    posts,
    isPostsLoading,
    isPostsError
   }
}

  export default useDiscoverVideos