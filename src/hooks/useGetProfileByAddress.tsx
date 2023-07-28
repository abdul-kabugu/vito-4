
import {useState, useEffect, useContext} from 'react'
import {useQuery} from '@apollo/client'
import { GET_PROFILE_BY_ADDRESS } from '@/graphql/Queries'



  const  useGetProfileByAddress = (address : string) =>  {
   const {data : profile , loading : isProfileLoading, error: isProfileError } = useQuery(GET_PROFILE_BY_ADDRESS, {
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
    profile,
    isProfileLoading,
    isProfileError
   }
}

  export default useGetProfileByAddress