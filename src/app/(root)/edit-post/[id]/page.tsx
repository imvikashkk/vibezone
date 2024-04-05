"use client";

import Loader from "@/components/loader/Loader";
import EditPosting from "@/components/form/EditPosting";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`/api/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPostData(data);
      setLoading(false);
    };
    getPost();
  }, [id]);

  return loading ? (
    <Loader />
  ) : (
    <div className="pt-6">
      <EditPosting post={postData} />
    </div>
  );
};

export default EditPost;
