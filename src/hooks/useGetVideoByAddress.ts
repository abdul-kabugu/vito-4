
import {useState, useEffect, useContext} from 'react'
import {useQuery} from '@apollo/client'
import { DISCOVER_VIDEOS } from '@/graphql/Queries'



  const  useGetVideoByAddress = (address : string) =>  {
   const {data : posts , loading : isPostsLoading, error: isPostsError } = useQuery(DISCOVER_VIDEOS, {
    variables : {
        "where": {
            "address": {
              "_eq": address
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

  export default useGetVideoByAddress