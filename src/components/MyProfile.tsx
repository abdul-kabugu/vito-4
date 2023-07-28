import { useGumContext } from '@gumhq/react-sdk';
import { Profile as ProfileComponent } from '@gumhq/ui-components';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from '@/styles/Home.module.css';
import React from 'react';
import { useRouter } from 'next/router';
import WalletMultiButtonDynamic from './WalletMultiButtonDynamic';

export function MyProfile() {
  const wallet = useWallet();
  const { sdk } = useGumContext();
  const router = useRouter();
  const [myProfiles, setMyProfiles] = React.useState([] as any); 

    console.log("my wallet", wallet?.publicKey)
  React.useEffect(() => {
    const getMyProfile = async () => {
      if (sdk && wallet.publicKey) {
        const myProfile = await sdk.profile.getProfilesByAuthority(wallet.publicKey) || [];
        setMyProfiles(myProfile);
      }
    };
    getMyProfile();
  }, [sdk, wallet.publicKey]);

  // If there are no profiles, render a message saying so.
  if ( wallet?.publicKey &&  myProfiles.length === 0) {
    return (
      <div>
      <button className='py-1.5 px-4 rounded-lg bg-fuchsia-600'>create profile</button>
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
