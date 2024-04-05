"use client";

import { useUserInformation } from "@/context";
import PostCard from "@/components/cards/PostCard";

const SavedPosts = () => {
  const {userDBData} = useUserInformation()

  return (
    <div className="w-full h-full overflow-auto items-center flex flex-col gap-10">
      {userDBData?.savedPosts?.map((post:any, index:number) => (
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

export default SavedPosts;
