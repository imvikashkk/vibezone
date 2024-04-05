import {
  Bookmark,
  BookmarkBorder,
  BorderColor,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import type { PostType } from "@/lib/models/Post";
import Modal from "../modal/Modal";
import { useUserInformation } from "@/context";

interface Props {
  post: PostType;
  creator: any;
  loggedInUserDB: any;
  update?:any;
}

export default function PostCard({
  post,
  creator,
  loggedInUserDB,
  update
}: Props): ReactNode {
  const {getUser} = useUserInformation()
  
  const isLiked = loggedInUserDB?.likedPosts.find(
    (item: any) => item._id === post._id
  );

  const [liked, setLiked] = useState<boolean>(isLiked);
  const [saved, setSaved] = useState<boolean>(false);
  const [totalLiked, setTotalLiked] = useState<number>(
    post?.likes?.length || 0
  );

  const [isDeleted, setDeleted] = useState<boolean>(false);
  const [isModal, setModal] = useState<boolean>(false);


  useEffect(() => {
      const isSaved = loggedInUserDB?.savedPosts?.find(
        (item: any) => item._id === post._id
      );
      setSaved(isSaved ? true : false);
  }, [loggedInUserDB?.savedPosts, post]);

  const handleLike = async () => {
    setLiked((prev) => !prev);
    setTotalLiked(liked ? totalLiked - 1 : totalLiked + 1);
      const response = await fetch(
        `/api/user/${loggedInUserDB._id}/like/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(typeof update === "function"){
        update()
      }
      getUser()
  };

  const handleSave = async () => {
    setSaved((prev) => !prev);
    const response = await fetch(
      `/api/user/${loggedInUserDB._id}/save/${post._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    getUser()
  };

  const handleDelete = async () => {
    setDeleted(() => true);
    await fetch(`/api/post/${post._id}/${loggedInUserDB._id}`, {
      method: "DELETE",
    });
    getUser()
    if(typeof update === 'function'){
      update()
    }
  };

  return isDeleted ? (
    <div></div>
  ) : (
    <>
      <div className="w-full mx-auto max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2">
        <div className="flex justify-between">
          <Link href={`/profile/${creator.username}`}>
            <div className="flex gap-3 items-center">
              <Image
                src={creator.profilePhoto}
                alt="profile photo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-col gap-1">
                <p className="text-small-semibold text-light-1">
                  {creator.firstName} {creator?.lastName}
                </p>
                <p className="text-subtle-medium text-light-3">
                  @{creator.username}
                </p>
              </div>
            </div>
          </Link>

          {loggedInUserDB?._id === creator?._id && (
            <Link href={`/edit-post/${post?._id}`}>
              <BorderColor sx={{ color: "white", cursor: "pointer" }} />
            </Link>
          )}
        </div>

        <p className="text-body-normal text-light-1 max-sm:text-small-normal">
          {post?.caption}
        </p>

        <Link
          href={post.postPhoto}
          target="_blank"
          className="flex-1 flex justify-center items-center">
          <Image
            src={post?.postPhoto}
            alt="post photo"
            width={100}
            height={100}
            className="max-h-[30rem] rounded-lg overflow-hidden w-full object-fill"
          />
        </Link>

        <p className="text-base-semibold text-purple-1 max-sm:text-small-normal">
          {post.tag}
        </p>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center" onClick={handleLike}>
            {!liked ? (
              <FavoriteBorder sx={{ color: "white", cursor: "pointer" }} />
            ) : (
              <Favorite sx={{ color: "red", cursor: "pointer" }} />
            )}
            <p className="text-light-1">{totalLiked}</p>
          </div>

          {saved ? (
            <Bookmark
              sx={{ color: "purple", cursor: "pointer" }}
              onClick={handleSave}
            />
          ) : (
            <BookmarkBorder
              sx={{ color: "white", cursor: "pointer" }}
              onClick={handleSave}
            />
          )}

          {loggedInUserDB?._id === creator?._id && (
            <Delete
              sx={{ color: "white", cursor: "pointer" }}
              onClick={() => {
                setModal(()=>false)
                setTimeout(()=>{
                  setModal(()=>true)
                }, 100)
              }}
            />
          )}
        </div>
      </div>

      <Modal
        title="Delete Post"
        message="Are you sure you want to delete this post?"
        dangerOption="Delete"
        cancelOption="Cancel"
        dangerAction={handleDelete}
        cancelAction={() => setModal(false)}
        showModal={isModal}
      />
    </>
  );
}
