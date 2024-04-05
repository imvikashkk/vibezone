"use client";

import Loader from "@/components/loader/Loader";
import PostCard from "@/components/cards/PostCard";
import { useUserInformation } from "@/context";

interface PostType {
  _id: string;
  creator: string;
  caption: string;
  tag: string;
  likes: string[];
  postPhoto: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


const Home = () => {
  const { userDBData, getFeedPost, feedPost } = useUserInformation();

  return (
    <div className="w-full items-center flex flex-col gap-10">
      {userDBData &&
        (feedPost.length < 1 ? (
          <Loader />
        ) : (
          feedPost.map((post: PostType) => (
            <PostCard
              key={post._id}
              post={post}
              creator={post.creator}
              loggedInUserDB={userDBData}
              update={getFeedPost}
            />
          ))
        ))}
    </div>
  );
};

export default Home;
