// @ts-nocheck

import useTruncateText from '@/hooks/useTruncateText'
import {useState} from 'react'
import { FacebookIcon, FacebookShareButton, InstapaperShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

export default function ShareButtons({postId}) {
    const [isUrlCopied, setisUrlCopied] = useState(false)
    const url = `https://frentube.xyz/watch/${postId}`

const {shortenTxt} = useTruncateText()
      // handle copy url
      const copyToClipboard = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          setisUrlCopied(true);
          setTimeout(() => {
            setisUrlCopied(false);
          }, 2000);
        } catch (err) {
          alert('Failed to copy: ', err);
        }
      }
  return (
    <div className=''>
      <div className='flex gap-2'>
      <TwitterShareButton url={url} >
           <TwitterIcon  size={35} round={true} />
         </TwitterShareButton>
           <FacebookShareButton url={url}>
             <FacebookIcon  size={35} round={true} />
           </FacebookShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon   size={35} round={true} />
            </LinkedinShareButton>
              <PinterestShareButton url={url}>
                   <PinterestIcon  size={35} round={true}   />
              </PinterestShareButton>
              <RedditShareButton url={url}>
                <RedditIcon  size={35} round={true} />
              </RedditShareButton>
               <TelegramShareButton url={url}>
                 <TelegramIcon  size={35} round={true} />
               </TelegramShareButton>

               <WhatsappShareButton url={url}>
                 <WhatsappIcon   size={35} round={true}  />
               </WhatsappShareButton>
                
      </div>

       <div className='py-1.5 px-3 rounded-lg  border border-fuchsia-900/50 mt-3 flex  gap-5 items-center'>
        <p className='text-sm'>{url && shortenTxt(url, 40)}</p>
         <button className='bg-fuchsia-600  capitalize px-2 rounded-lg text-white' onClick={() => copyToClipboard(url)}>{isUrlCopied ? "Copied" : "Copy"}</button>
       </div>
    </div>
  )
}
