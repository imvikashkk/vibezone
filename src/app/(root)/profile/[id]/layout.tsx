"use client";

import Loader from "@/components/loader/Loader";
import ProfileCard from "@/components/cards/ProfileCard";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { useUserInformation } from "@/context";
import { userProfileData } from "@/hooks/UseUserProfileData";

const initialUserType = {
  _id: "",
  clerkId: "",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  profilePhoto: "",
  posts: [],
  savedPosts: [],
  likedPosts: [],
  followers: [],
  following: [],
};

function RootLayout({ children }: { children: React.ReactNode }) {
  const currPath = usePathname();
  const path = currPath.split("/");
  let actualPath = "/";
  if (path[path.length - 1] === "followers") {
    actualPath = "Followers";
  } else if (path[path.length - 1] === "following") {
    actualPath = "Following";
  } else {
    actualPath = "Posts";
  }

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(initialUserType);
  const [isError, setError] = useState(false);
  const userInfo = useUserInformation();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/user/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  return  userInfo?.userDBData && loading ? (
    <Loader />
  ) : (
    <div className="">
      <div className="w-full flex flex-1 justify-around">
         <ProfileCard userData={userData} activeTab={actualPath} />
      </div>
      <div className="w-full mt-6"> 
        {isError ? (
          <h1 className="text-center text-heading3-bold">404 User Not Found</h1>
        ) : (
          <>
            <userProfileData.Provider value={{ userProfileData: userData }}>
              {children}
            </userProfileData.Provider>
          </>
        )}
      </div>
    </div>
  );
}

export default RootLayout;
