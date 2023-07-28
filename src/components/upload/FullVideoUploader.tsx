
import { useState } from "react";
import VideoMetadata from "./VideoMetadata";
import VideoSelector from "./VideoSelector";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCreatePost, useGumContext, useSessionWallet, useUploaderContext, GPLCORE_PROGRAMS, useReaction } from "@gumhq/react-sdk";

export default function FullVideoUploader() {
  const [videoFile, setvideoFile] = useState();
  console.log("the selected file", videoFile);
  const { sdk } = useGumContext();
  const wallet = useWallet();
  const session = useSessionWallet();
  const cluster = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as "devnet" | "mainnet-beta") || 'devnet';
  const { publicKey: sessionPublicKey, sessionToken, createSession, sendTransaction }  = session;
  const { handleUpload, uploading, error } = useUploaderContext();
  const { createWithSession, postPDA, createPostError } = useCreatePost(sdk);
  const { createReactionWithSession } = useReaction(sdk);
  console.log("the session public key", sessionPublicKey)
  return (
    <div className="">
      {videoFile ? (
        <VideoMetadata videoFile={videoFile} setVideoFile={setvideoFile} />
      ) : (
        <VideoSelector handleSelectFile={setvideoFile} />
      )}
    </div>
  );
}
