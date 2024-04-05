"use client";

import { useUserInformation } from "@/context";
import PostCard from "@/components/cards/PostCard";

const LikedPosts = () => {
  const {userDBData} = useUserInformation()

  return (
    <div className="w-full items-center flex flex-col gap-10">
      {userDBData?.likedPosts?.map((post:any, index:number) => (
        <PostCard
          key={index}
          post={post}
          creator={post.creator}
          loggedInUserDB={userDBData}
        />
      ))}
    </div>
  );
};

export default LikedPosts;
