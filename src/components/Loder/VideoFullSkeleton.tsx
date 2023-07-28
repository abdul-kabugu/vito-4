import React from 'react'
import RelatedVideoLosderSkelton from './RelatedVideoLosderSkelton'

export default function VideoFullSkeleton() {
  return (
    <div className='flex gap-2'>
    <div className="flex flex-col  animate-pulse  h-full justify-center flex-grow flex-shrink xl:w-[73vw]">
       <div className=" xs:w-[100vw]  md:w-[80vw] lg:w-[90vw] xl:w-[70vw] lg:h-[70vh] xs:h-[200px]  bg-gray-300  rounded-lg mb-1 ">
              </div>
        <div className="w-[350px] h-[10px] bg-gray-300 rounded-md mt-3"></div>

        <div className='mt-3 px-5 flex justify-between'>
          <div className='w-[50px] h-[50px] rounded-full bg-gray-300'></div>
           <div className='w-[110px] h-[30px] rounded-lg bg-gray-300'></div>
        </div>

        <div className='mt-4 flex justify-between'>
            <div className='w-[140px] h-[35px] bg-gray-300 rounded-lg'></div>
            <div className='w-[140px] h-[35px] bg-gray-300 rounded-lg'></div>

            <div className='w-[140px] h-[35px] bg-gray-300 rounded-lg'></div>
           

        </div>
    </div>

    <RelatedVideoLosderSkelton  />
    </div>
  )
}
