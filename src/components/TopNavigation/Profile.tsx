import { useState, Fragment, useEffect, useRef } from "react";
import {CiWallet} from 'react-icons/ci'
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbVideoPlus } from "react-icons/tb";
import { Menu, Transition } from "@headlessui/react";
import { profileMenuLinks } from "../constants";
import { AiOutlineSetting } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { BellOutline, MoonOutline, SunOutline, UploadOutline } from "@/Icons";
import Link from "next/link"
import  { MyProfile } from "../MyProfile";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletMultiButtonDynamic from "../WalletMultiButtonDynamic";
import { useInitializeProfile } from "@/hooks/useInitializeProfile";
import { useGumContext } from "@gumhq/react-sdk";

export default function Connected() {
  const wallet = useWallet();
  const {sdk} = useGumContext()

  const [myProfiles, setMyProfiles] = useState([] as any); 
  const getMyProfile = async () => {
    if (sdk && wallet.publicKey) {
      const myProfile = await sdk.profile.getProfilesByAuthority(wallet.publicKey) || [];
      setMyProfiles(myProfile);
    }
  };
  
  useEffect(() => {
   if(sdk && wallet.publicKey){
    getMyProfile()
   }
  }, [sdk, wallet.publicKey])
  
const CURRENT_CHANNEL = myProfiles[0]?.metadata?.name
 console.log("the initialized profile", myProfiles)
  const UserConnected = () => {
    return (
      <div className="flex items-center gap-2">
        <div className="hover:bg-gray-700 cursor-pointer h-8 w-8 flex items-center justify-center rounded-full py-0.5 px-1.5">
          <BellOutline className="w-6 h-6  rounded-full "  />
        </div>
        <Link href={`/upload`} className="text-gray-200">
          {/*<div className="flex xs:gap-1 md:gap-2 items-center bg-blue-700 text-white xs:py-1.5 md:py-2 xs:px-2 md:px-3 font-sans rounded-lg cursor-pointer xs:hidden md:flex ">*/}
            <TbVideoPlus size={26} className="xs:hidden md:block" />
             {/*<button>New video</button>
          </div>*/}
        </Link>
        <div>
           {! wallet?.publicKey ? (
             <WalletMultiButtonDynamic  />
           ): (
          <Menu as="div" className="relative ">
            <Menu.Button>
              <div className="border border-gray-700 flex gap-2  items-center xs:rounded-full md:rounded-full cursor-pointer ">
               <MyProfile    />
                
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="div"
                className="absolute right-0 bg-gray-800 shadow-lg  border  border-gray-700 rounded-lg w-[215px] px-2 py-2"
              >
                {profileMenuLinks.map((link, i) => {
                  return (
                    <Menu.Item key={i}>
                      <Link href={`/channel/${CURRENT_CHANNEL}`} className="text-gray-200">
                      <div className="flex items-center gap-2 cursor-pointer  py-2  hover:bg-gray-700 px-2 rounded-lg my-2">
                        <link.icon className="w-4 h-4 " />
                        <p className=" text-sm  capitalize ">{link.title}</p>
                      </div>
                      </Link>
                    </Menu.Item>
                  );
                })}

                <Menu.Item>
                  <div
                    className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-gray-700 px-2 rounded-lg my-2"
                  
                  >
                    <AiOutlineSetting className="w-5 h-5" />
                    <button className=" text-sm capitalize ">
                      Channel Settings
                    </button>
                  </div>
                </Menu.Item>
                
                <Menu.Item>
                
                   
                      <div
                        className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-gray-700 px-2 rounded-lg my-2"
                        
                      >
                        <VscSignOut className="w-5 h-5" />
                        <button className=" capitalize ">Signout</button>
                      </div>
                    
                 
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
  )}
        </div>
      </div>
    );
  };

  const ConnectWallet = () => {
    return (
     <WalletMultiButtonDynamic  />
    );
  };

  return (
    <div><UserConnected /> </div>
  );
}

