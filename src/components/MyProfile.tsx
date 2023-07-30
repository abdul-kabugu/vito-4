import { useGumContext } from '@gumhq/react-sdk';
import { Profile as ProfileComponent } from '@gumhq/ui-components';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '@/styles/Home.module.css';
import {useState, useEffect, Fragment} from 'react';
import { useRouter } from 'next/router';
import WalletMultiButtonDynamic from './WalletMultiButtonDynamic';
import { Dialog, Transition } from '@headlessui/react'
import CreateProfile from './CreateProfile';

export function MyProfile() {
  const wallet = useWallet();
  const { sdk } = useGumContext();
  const router = useRouter();
  const [myProfiles, setMyProfiles] = useState([] as any); 
  const [testTruth, settestTruth] = useState(true)
  const [isShowCreateProfile, setisShowCreateProfile] = useState(false)
    console.log("my wallet", wallet?.publicKey)
  useEffect(() => {
    const getMyProfile = async () => {
      if (sdk && wallet.publicKey) {
        const myProfile = await sdk.profile.getProfilesByAuthority(wallet.publicKey) || [];
        setMyProfiles(myProfile);
      }
    };
    getMyProfile();
  }, [sdk, wallet.publicKey]);

    const handleCreateProfile = () => {
       setisShowCreateProfile(! isShowCreateProfile)
    }

  // If there are no profiles, render a message saying so.
  if ( wallet?.publicKey &&  myProfiles.length === 0) {
    return (
      <div>
      <button className='py-1.5 px-4 rounded-lg bg-fuchsia-600 text-gray-300' onClick={handleCreateProfile}>create profile</button>

        {isShowCreateProfile && (
           <Transition appear show={isShowCreateProfile} as={Fragment}>
           <Dialog as="div" className="relative z-10" onClose={handleCreateProfile}>
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
                   <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black border-r-fuchsia-950/30 text-white p-2 text-left align-middle shadow-xl transition-all">
                     <Dialog.Title
                       as="h3"
                       className="text-lg font-medium leading-6 text-white"
                     >
                     create profile
                     </Dialog.Title>
                     <div className="mt-2">
                     <CreateProfile    />
                     </div>
   
                   </Dialog.Panel>
                 </Transition.Child>
               </div>
             </div>
           </Dialog>
         </Transition>
        )}
      </div>
    );
  }

  // Map over the array of myProfiles, creating a Profile component for each one.
  const profileComponents = myProfiles.map((myProfile: any, index: any) => {
    // Construct profile data for each profile.
    const profileData = {
      ...myProfile.metadata,
      following: myProfile.following || 0,
      followers: myProfile.followers || 0,
    };

      console.log("the profile data", profileData)

    return (
      <div key={index} className='w-9 bg-gray-700 h-9 rounded-full  flex items-center justify-center'>
        <img src={profileData?.avatar} className='w-8 h-8 rounded-full' />
        
      </div>
    );
  });

  return (
    <div>
   
      {profileComponents}
    
    </div>
  );
}
