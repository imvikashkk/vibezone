"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import PostCard from "@/components/cards/PostCard";
import { useUserInformation } from "@/context";
import { PostType } from "@/lib/models/Post";

const SearchPosts = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchedPost, setSearchedPost] = useState([]);
  const {userDBData} = useUserInformation()

  const getSearchedPost = useCallback(async () => {
    const response = await fetch(
      `/api/user/search/posts/${searchParams.get("q")}`
    );
    if (response.ok) {
      const data = await response.json();
      setSearchedPost(data);
    }
    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    getSearchedPost();
  }, [getSearchedPost]);
  return loading ? (<Loader />) : (
    <div className="flex flex-col gap-10 items-center">
      {searchedPost.map((post:PostType, index:number) => (
        <PostCard key={index} creator={post.creator} post={post} loggedInUserDB={userDBData}/>
      ))}
    </div>
  );
};

export default SearchPosts;
