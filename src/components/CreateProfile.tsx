import { useCreateProfile, useGumContext, useUploaderContext } from '@gumhq/react-sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@/styles/CreateProfile.module.css'


function CreateProfile() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('https://i.imgur.com/uGv5Zca.jpg');
  const router = useRouter();
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { sdk } = useGumContext();
  const { createProfileWithDomain, createProfileError } = useCreateProfile(sdk);
  const { handleUpload, uploading, error } = useUploaderContext();
  console.log(`Error: ${createProfileError}`)
  // check if user has a profile and user account and create them if not
  const createDomainAndProfile = async (event: React.FormEvent<HTMLFormElement>, name: string, bio: string, username: string, avatar: string) => {
    event.preventDefault();
    if (!publicKey) {
      alert("No Address");
      return;
    }

    console.log(`processing create profile for ${publicKey?.toBase58()}`)
    let profilePDA = await sdk.profile.getProfileByDomainName(username);
    if (profilePDA) {
      console.log("profile account found with username", username);
     alert("thisa name is not exist")
    }

    //  create profile metadata and upload to arweave
    const profileMetadata = {
      name: name,
      bio: bio,
      avatar: avatar,
    };

    const uploadRes = await handleUpload(profileMetadata, wallet);
    if (!uploadRes) {
      console.error("error uploading profile metadata");
      return false;
    }
    const res = await createProfileWithDomain(uploadRes.url, username, publicKey)
    if (!res) {
      console.error("error creating profile");
      return false;
    }
    router.push('/upload');
  }

  return (
    <>
   
      <div className="flex w-full">
       
        <form onSubmit={(event) => createDomainAndProfile(event, name, bio, username, avatar)} className='flex w-full flex-col'>
          <label htmlFor="name" className="font-semibold uppercase">Name</label>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} className='py-2 px-2 rounded-md border-gray-700 bg-gray-900'  />
          <label htmlFor="bio" className={styles.label}>Bio</label>
          <input type="text" id="bio" value={bio} onChange={(event) => setBio(event.target.value)}  className='py-2 px-2 rounded-md border-gray-700 bg-gray-900' />
          <label htmlFor="username" className={styles.label}>Username</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} className='py-2 px-2 rounded-md border-gray-700 bg-gray-900' />
          <label htmlFor="avatar" className={styles.label}>Avatar url</label>
          <input type="text" id="avatar" value={avatar} onChange={(event) => setAvatar(event.target.value)}  className='py-2 px-2 rounded-md border-gray-700 bg-gray-900' />
          <button type="submit" className='px-4 py-2 rounded-lg bg-fuchsia-600 mt-3'>Create Profile</button>
        </form>
      </div>
    </>
  );
}

export default CreateProfile;
