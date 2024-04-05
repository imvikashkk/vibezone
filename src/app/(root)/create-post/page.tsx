"use client";

import Posting from "@/components/form/Posting";
import { useUserInformation } from "@/context";

const CreatePost = () => {
  const {userDBData} = useUserInformation();

  const postData = {
    creator: userDBData?._id,
    caption: "",
    postPhoto: "",
    tag: "",
  };

  return (userDBData) && (
    <div className="pt-6">
      <Posting post={postData} apiEndpoint={"/api/post/new"} />
    </div>
  );
};

export default CreatePost;

