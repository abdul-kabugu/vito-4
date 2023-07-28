
//@ts-nocheck

import { useRef, useState, useEffect } from "react";
import { AddImageOutline } from "@/Icons";
import {
  generateVideoThumbnailViaUrl,
  generateVideoThumbnails,
  importFileandPreview,
} from "@rajesh896/video-thumbnails-generator";
import { useInitializeProfile } from "@/hooks/useInitializeProfile";
import { AiOutlineClose } from "react-icons/ai";
import { LIVEPEER_KEY } from "../constants";
import { usePostVideo } from "../../hooks/usePostVideo";
import { usePinToIpfs } from "@/hooks/usePinToIpfs";
import { useCreateAsset } from "@livepeer/react";
import { ClipLoader } from "react-spinners";
import { ThumbnailsLoadingSpinner } from "../spinners";
import { useCreatePost, useGumContext, useSessionWallet, useUploaderContext, GPLCORE_PROGRAMS, useReaction, } from "@gumhq/react-sdk";

import { getPostsWithReaction, getProfileAccount, refreshSession } from "@/utils";
import { toast } from "react-toastify";
import { PublicKey } from "@solana/web3.js";


export type PostData = {
  content: {
    content: JSON;
    format: string;
  };
  type: string;
  authorship: {
    signature: string;
    publicKey: string;
  };
  app_id: string;
  metadataUri: string;
  transactionUrl: string;
  reaction: string[];
  address: string;
};
export default function VideoMetadata({ videoFile, setVideoFile }) {
  const [videoTitle, setvideoTitle] = useState("");
  const [caption, setcaption] = useState("");
  const [videoTags, setVideoTags] = useState([]);
  const { handleUpload, uploading :isUploadingMetadata, error: uploadingMetadatError} = useUploaderContext();
  const { sdk } = useGumContext();
  const profile = useInitializeProfile();
  const { createWithSession, postPDA, createPostError } = useCreatePost(sdk);
  const cluster = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as "devnet" | "mainnet-beta") || 'devnet';
  const session = useSessionWallet();
  const { publicKey: sessionPublicKey, sessionToken, createSession, sendTransaction }  = session;
  const [videoTag, setvideoTag] = useState("");
  const [isSenstive, setisSensitive] = useState("no");
  const [videoThumnail, setvideoThumnail] = useState();
  const [selectedThumbnail, setselectedThumbnail] = useState();
  const [pointedThumbail, setpointedThumbail] = useState();
  const [isGeneratingThumbnails, setisGeneratingThumbnails] = useState(true);
  const [videoThumbnails, setvideoThumbnails] = useState([]);
  const [videoUrl, setvideoUrl] = useState("");
  const [isUploadingCover, setisUploadingCover] = useState(false);
  const [isVideoUploading, setisVideoUploading] = useState(false);
  const [isCreatingNote, setisCreatingNote] = useState(false);
  const [trueTest, settrueTest] = useState(true);
  const [isNotCreated, setisNotCreated] = useState(false);
  const [coverCID, setcoverCID] = useState();

  console.log("the live peer key", LIVEPEER_KEY);
  console.log("the session public key", sessionPublicKey?.toBase58())
  const { uploadToIpfs, isUploading, isUploadingError } = usePinToIpfs();
  // const {postVideo} = usePostVideo()
  const selectThumbnailRef = useRef(null);
  // console.log("thumbnails ", videoThumbnails)
  //
  const addTag = (event) => {
    if (event.key === "Enter" && videoTag.length > 1 && videoTags.length < 5) {
      setVideoTags([...videoTags, videoTag]);
      setvideoTag("");
    }
  };

  //Remove  tag
  const removeTag = (index) => {
    setVideoTags([
      ...videoTags.filter((tags) => videoTags.indexOf(tags) !== index),
    ]);
  };

   console.log("is metadta uploading", isUploadingMetadata)
   console.log("is uploading metadata error", uploadingMetadatError)

   
  /*
   =========================
   UPLOD VIDEO THUMBNAIL
   ==========================
   */
  const handleUploadThumbnail = async () => {
    if (selectedThumbnail || videoThumbnails) {
      const base64ToBlob = (base64String, type) => {
        try {
          const byteCharacters = atob(base64String);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          return new Blob([byteArray], { type: type });
        } catch (error) {
          if (error.name === "InvalidCharacterError") {
            console.error("Invalid base64 string:", base64String);
            return null;
          } else {
            throw error;
          }
        }
      };

      // UPLOAD_VIDEO_COVER_TO_IPFS

      setisUploadingCover(true);
      const jpegBlob = base64ToBlob(
        selectedThumbnail?.replace(/^data:image\/(png|jpeg|jpg);base64,/, "") ||
          videoThumbnails[0]?.replace(
            /^data:image\/(png|jpeg|jpg);base64,/,
            ""
          ),
        "image/png"
      );
      const videoCoverCID = await uploadToIpfs(jpegBlob);
      console.log("the image cid", videoCoverCID);
      setcoverCID(videoCoverCID?.path);
      setisUploadingCover(false);
    }
  };

  useEffect(() => {
    handleUploadThumbnail();
  }, [selectedThumbnail, videoThumbnails]);

  /* 
    ===============================
        END OF UPLOAD THUMBNAIL 
    ================================
    */

  /*
     ===============================
       GENERATE VIDEO  THUMBNAILS
     ==============================
     
     */

  useEffect(() => {
    if (videoFile) {
      importFileandPreview(videoFile).then((res) => {
        setvideoUrl(res);
      });
      generateVideoThumbnails(videoFile, 6)
        .then((res) => {
          setvideoThumbnails(res);
          setisGeneratingThumbnails(false);
          //setvidThunbnail(videoThumbnails[0])
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [videoFile]);

  /*
     ===========================================
      END OF  GENERATE VIDEO  THUMBNAILS
     ========================================
     
     */

  /*
     ===============================
       RESET FORM FUNCTION
     ==============================
     
     */

  const handleReset = () => {
    setvideoTitle("");
    setcaption("");
    setVideoTags([]);
    setVideoFile();
    setselectedThumbnail();
  };

  /*
     ===============================
       END OF RESET FUNCTION
     ==============================
     
     */

  /*
     ==================================
       LIVEPEER HOOK TO UPLOAD FILE
     ====================================
     
     */
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
    isLoading,
  } = useCreateAsset(
    videoFile
      ? {
          sources: [
            {
              name: videoFile.name,
              file: videoFile,
              storage: {
                ipfs: true,
                metadata: {
                  name: "interesting video",
                  description: "a great description of the video",
                },
              },
            },
          ] as const,
        }
      : null
  );
  console.log("the progress of video", isLoading);
  console.log("the error state  of video", error);

  console.log("the assets itsell", assets);
  /*
     ===========================================
       END OF LIVEPEER HOOK TO UPLOAD FILE
     ===========================================
     
     */
  


  /*
     ===============================
       UPLOAD VIDEO FUNCTION
     ==============================
     */
  const postVideo = async () => {
    //UPLOAD_VIDEO_TO_LIVEPEER
    setisVideoUploading(true);
    await createAsset();
    setisVideoUploading(false);
  };
  /*
     ===============================
       END UPLOAD VIDEO FUNCTION
     ==============================
     */
  /*
     ======================================
       POST_VIDEO AS NOTE TO CROSSBELL
     =======================================
     */
  const handleCreateNote = async () => {
    try{
      
   console.log("the post note function is excuted")
    setisCreatingNote(true);
   
    /*============================
        handle post to blockchain
    ============================== */
   
    const updatedSession = await refreshSession(session, cluster);

    if (!updatedSession || !updatedSession.sessionToken || !updatedSession.publicKey || !updatedSession.signMessage || !updatedSession.sendTransaction || !profile) {
      console.log(` profile: ${profile}`);
      console.log("Session or profile details missing");
      return;
    }

      

    const postArray = new TextEncoder().encode(videoTitle);
    const signature = await updatedSession.signMessage(postArray);
    const signatureString = JSON.stringify(signature.toString());

    let metadata = {
      content: {
        content: {
          title : videoTitle,
          video : assets[0]?.playbackId,
          image : coverCID,
          description : caption
        },
        format: "json",
      },
      type: "json",
      authorship: {
        publicKey: updatedSession.publicKey.toBase58(),
        signature: signatureString,
      },
      app_id: "vito_1",
    } as PostData;

    const uploader = await handleUpload(metadata, updatedSession);
    if (!uploader) {
      console.log("Error uploading post");
      return;
    }

    const postResult = await createWithSession(uploader.url, profile, updatedSession.publicKey, new PublicKey(updatedSession.sessionToken), updatedSession.sendTransaction);
    if (!postResult || !postPDA) {
      console.log("Error creating post");
      return;
    }

    console.log("the note results", postResult);

    setisNotCreated(true);
      setisCreatingNote(false);
      toast.success("video have been created")

        // tryn 
       // metadata.metadataUri = uploader.url;
       // metadata.transactionUrl = `https://solana.fm/tx/${postResponse}?cluster=devnet-solana`;
    } catch (error) {
      toast.error("Something went wrong when creating video")
      setisCreatingNote(false);
       console.log("the poster error", error)
    }
  };

  useEffect(() => {
    if (status === "success" && !isNotCreated) {
      handleCreateNote();
    }
  }, [status, isNotCreated]);

  /*
     ======================================
       END POST_VIDEO AS NOTE TO CROSSBELL
     =======================================
     */

  /*
     ======================================
       GET CURRENT  UPLOADING STATE
     =======================================
     */
  const getCurrentUploadingState = () => {
    if (status === "loading") {
      return "Uploading Video";
    } else if (isCreatingNote) {
      return "Posting Video";
    } else {
      return "Post Video";
    }
  };

  /*
     ======================================
      END OF  GET CURRENT  UPLOADING STATE
     =======================================
     */

  return (
    <div className="xs:mb-[70px] md:mb-0 min-h-screen flex  xs:flex-col md:flex-row gap-3 items-center justify-center">
      <div className="flex-1 h-full px-4 py-2">
        <div className="flex flex-col gap-2 mb-3">
          <h1 className="opacity-75 text-sm">TITLE</h1>
          <input
            value={videoTitle}
            onChange={(e) => setvideoTitle(e.target.value)}
            placeholder="Title that describes Your video"
            className="py-2 px-4 focus:outline-none border border-gray-700 rounded-lg  bg-inherit focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <h1 className="opacity-75 text-sm">DESCRIPTION</h1>
          <textarea
            value={caption}
            onChange={(e) => setcaption(e.target.value)}
            placeholder="Description of your video"
            className="h-32 py-2 px-4 focus:outline-none border rounded-lg border-gray-700  bg-inherit focus:border-blue-400 resize-none"
          />
        </div>
        <div className="border border-gray-700 rounded-lg h-32 px-4 py-2 my-3">
          <h1 className="opacity-75 text-sm">TAGS</h1>
          <input
            value={videoTag}
            onChange={(e) => setvideoTag(e.target.value)}
            placeholder="Eg Music"
            onKeyUp={(event) => addTag(event)}
            className="focus:outline-none border border-gray-800 px-4 bg-inherit rounded-md py-1 w-full"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {videoTags?.map((tag, i) => (
              <div
                className="flex bg-blue-600 opacity-70 py-1 px-4 rounded-md items-center text-white gap-2"
                key={i}
              >
                <p>{tag}</p>
                <AiOutlineClose
                  size={16}
                  className="cursor-pointer"
                  onClick={() => removeTag(i)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="opacity-90 text-sm">
            Does this video contain sensitive information that targets an adult
            audience?
          </h1>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isSensitive"
                value="yes"
                checked={isSenstive === "yes"}
                className="bg-inherit"
                onChange={() => setisSensitive("yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isSensitive"
                value="no"
                className="bg-inherit"
                checked={isSenstive === "no"}
                onChange={() => setisSensitive("no")}
              />
              No
            </label>
          </div>
        </div>
      </div>
      <div className="flex-1  h-full  px-3">
        <div className="z-0">
          <video
            width={500}
            controls
            className="rounded-md max-h-[310px] object-cover"
            poster={selectedThumbnail}
          >
            <source src={URL.createObjectURL(videoFile)} />
          </video>
        </div>

        <div className="my-4 ">
          <h1 className="opacity-75 text-sm my-3">THUMBNAILS</h1>
          <div className="flex flex-wrap gap-3">
            <div className="w-[120px] h-[70px] border border-gray-300 flex flex-col items-center justify-center rounded-lg">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setvideoThumnail(e.target.files[0])}
                ref={selectThumbnailRef}
                hidden
              />
              {videoThumnail ? (
                <img
                  src={URL.createObjectURL(videoThumnail)}
                  className="w-[100%] h-[100%] object-cover rounded-md"
                  alt="cover"
                />
              ) : (
                <>
                  <AddImageOutline
                    className="w-5 h-5 cursor-pointer opacity-70"
                    onClick={() => {
                      selectThumbnailRef.current.click();
                    }}
                  />
                  <h1 className="text-xs opacity-60">Upload</h1>
                </>
              )}
            </div>

            {isGeneratingThumbnails && (
              <div className="flex gap-2 items-center">
                {" "}
                <ClipLoader size={19} /> <p>Loading Thambnails</p>{" "}
              </div>
            )}
            {videoThumbnails?.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`w-[120px] h-[70px] cursor-pointer z-0 ${
                    pointedThumbail === i && "ring-2 ring-blue-700 rounded-lg"
                  } relative `}
                  onClick={() => {
                    setselectedThumbnail(item);
                    setpointedThumbail(i);
                  }}
                >
                  <img
                    src={item}
                    key={i}
                    className="rounded-lg w-full h-full object-cover"
                    alt="thumbnail"
                  />
                  {/*<div>
                          <h1 className='absolute top-[50%] left-[50%] right-[50%]'>loading</h1>
                      </div>*/}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 justify-end my-4">
          <button onClick={handleReset}>Reset</button>
          <div
            className="bg-blue-700 text-white font-semibold px-4 py-1.5 xl:py-2 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={postVideo}
          >
            <ClipLoader size={15} loading={isLoading || isCreatingNote} />
            <button className="bg-blue-700 text-white font-semibold   rounded-lg">
              {getCurrentUploadingState()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
