// @ts-nocheck

import { useState, Fragment } from 'react';
import { AiOutlineDislike, AiOutlineDollar, AiOutlineLike, AiOutlineLine, AiOutlineRetweet, AiOutlineShareAlt } from 'react-icons/ai';
import { RiShareForward2Line, RiShareForwardLine } from 'react-icons/ri';
import { Dialog, Transition } from '@headlessui/react';
import ShareButtons from './ShareButtons';
import TipUser from './TipUser';
import { useReaction, useGumContext, useSessionWallet } from '@gumhq/react-sdk';
import { useInitializeProfile } from '@/hooks/useInitializeProfile';
import { AmplifyAlt, DislikeAlt, LikeAlt } from '../../Icons';
import { PublicKey } from '@solana/web3.js';
import { refreshSession } from '@/utils';
import { toast } from 'react-toastify';
import { tipsTires } from '../constants';
export default function FullVideoCardFooter({ video }) {
  const [isShowShareToSocial, setisShowShareToSocial] = useState(false);
  const [isShowTipModal, setisShowTipModal] = useState(false);
  const [isThisLiked, setisThisLiked] = useState(false);
  const [isThisDesliked, setisThisDesliked] = useState(false);
  const [isAmplified, setisAmplified] = useState(false);
  const {sdk} = useGumContext()
  const session = useSessionWallet();
  const cluster = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as "devnet" | "mainnet-beta") || 'devnet';
  const [currentStep, setcurrentStep] = useState(0)
  const [selectedTier, setselectedTier] = useState(0)
 const [amountToDonate, setamountToDonate] = useState(1)
  console.log("video data fro footer", video)
  const { createReactionWithSession } = useReaction(sdk);
  const profile = useInitializeProfile();

  // const {likePost, deslikePost, isDeslikeLoading, isLikeLoading} = useReactions()

  const handleToggleShareToSocial = () => {
    setisShowShareToSocial(!isShowShareToSocial);
  }
  const handleLike = async (reaction: string) => {
    setisThisLiked(true)
    const updatedSession = await refreshSession(session, cluster);
    if (!updatedSession || !profile || !updatedSession.publicKey || !updatedSession.sessionToken || !updatedSession.sendTransaction) return;
    const reactionData = await createReactionWithSession(reaction, profile, new PublicKey(video?.address), updatedSession.publicKey, new PublicKey(updatedSession.sessionToken), updatedSession.publicKey, updatedSession.sendTransaction);
    console.log(`Reaction data: ${reactionData}`);
    toast.success("Liked video")

  }
  const handleDeslike = async (reaction : string) => {
    setisThisDesliked(true)
    const updatedSession = await refreshSession(session, cluster);
    if (!updatedSession || !profile || !updatedSession.publicKey || !updatedSession.sessionToken || !updatedSession.sendTransaction) return;
    const reactionData = await createReactionWithSession(reaction, profile, new PublicKey(video?.address), updatedSession.publicKey, new PublicKey(updatedSession.sessionToken), updatedSession.publicKey, updatedSession.sendTransaction);
    console.log(`Reaction data: ${reactionData}`);
    toast.success("Desliked video")
  }
 

  return (
    <div className='mt-3 lg:px-6 w-full  overflow-x-hidden text-gray-300'>
      <div className='flex xs:gap-2 gap-4'>
        <div className={`${isThisLiked && "text-violet-500"} flex gap-1 py-1 xs:px-1  lg:px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800`} onClick={() => handleLike("like")}>
          <LikeAlt className='w-5 h-5' />
          <button>Like 1</button>
        </div>

        <div className={`${isThisDesliked && "text-violet-500"} flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800`}onClick={() => handleDeslike("deslike")}>
          <DislikeAlt className='w-5 h-5' />
          <button> Dislike 0</button>
        </div>

       {/*} <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800 xs:hidden md:flex'>
          <AmplifyAlt className='w-5 h-5' />
          <button> Amplify</button>
  </div>*/}

        <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800 xs:hidden md:flex' onClick={() => setisShowTipModal(true)}>
          <AiOutlineDollar size={19} />
          <button> Tip</button>
        </div>

        <div className='flex gap-1 py-1 px-3 rounded-md  cursor-pointer font-semibold text-gray-400 items-center hover:bg-gray-800' onClick={() => setisShowShareToSocial(true)}>
          <RiShareForwardLine size={19} />
          <button> Share</button>
        </div>
      </div>

      {/* SHARE TO SOCIAL MODAL */}
      <Transition appear show={isShowShareToSocial} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setisShowShareToSocial(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 border-fuchsia-900" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl text-gray-300 bg-black border border-fuchsia-900/50 p-6 text-left align-middle shadow-xl transition-all  ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 "
                  >
                    Share
                  </Dialog.Title>
                  <Dialog.Description className={`mt-3`} as='div'>
                    <ShareButtons postId={video?.address} />
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* END OF SHARE MODAL */}

      <Transition appear show={isShowTipModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setisShowTipModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full border border-fuchsia-700/30 text-gray-300 max-w-md transform overflow-hidden rounded-2xl bg-black py-2 px-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-lg font-medium leading-6 "
                  >
                    
                   Support Creator
                      
                    
                  </Dialog.Title>
                  <Dialog.Description className={`mt-3`} as='div'>
                    {/*<TipUser video={video} />*/}
                    <div className='flex gap-4 flex-wrap justify-center my-6'> 
                    {tipsTires.map((tip, i) => {
                  return(
                    <div key={i} onClick={() => setamountToDonate(tip.amount)} className={`flex ${tip.amount === amountToDonate && "border-fuchsia-800 bg-fuchsia-700 text-white"} gap-2 border border-fuchsia-900/50 py-1.5 px-4 rounded-lg cursor-pointer`}> 
                      <p>{tip.emoji}</p>
                      <p>{tip.title}</p>
                    </div>
                  )
                })}
                     </div>

                      <div>
                      <button className='bg-fuchsia-700 my-3 hover:bg-fuchsia-600 w-full text-white  py-1.5 px-4 rounded-md disabled:bg-fuchsia-950' onClick={() => setcurrentStep(1)} disabled={true}> Send Tip</button>

                      </div>
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* TIP USER MODAL */}
    </div>
  );
}
