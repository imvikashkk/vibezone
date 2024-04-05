"use client";

import PostCard from "@/components/cards/PostCard";
import React from "react";
import { useUserInformation } from "@/context";
import UseUserProfileData from "@/hooks/UseUserProfileData";
const ProfilePosts = () => {
  const { userDBData } = useUserInformation();
  const {userProfileData} = UseUserProfileData()
  let reversedArray = [...userProfileData?.posts].reverse();
  return (
    <div className="w-full flex flex-col gap-9 justify-around">
      {reversedArray?.map((post:any, index:number) => (
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

export default ProfilePosts;
