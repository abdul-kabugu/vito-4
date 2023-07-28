import React from 'react'
import Head from 'next/head'
export default function feeds() {
  return (
    <>
    <Head>
        <title>Timeline</title>
    </Head>
    <div className='min-h-screen w-full bg-black flex items-center justify-center text-white'>
        <div className='flex flex-col items-center justify-center'>
            <img  src='/empty.svg' alt='feeds' className='w-[200px] rounded-md'     />
             <h3 className='mb-1'>Your Timeline is Empty</h3>
             <p>Follow More creatores</p>
        </div>
    </div>
    </>
  )
}
