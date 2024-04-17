"use client"
import { useUser } from "@clerk/nextjs";
import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";

const User_Information = createContext<any>(null);

function Index({ children }: { children: ReactNode }) {
  const { user, isLoaded }: { user: any; isLoaded: boolean } = useUser();
  const [userData, setUserData] = useState();
  const [feedPost, setFeedPost] = useState([]);

  // user from DB
  const getUser = useCallback(async () => {
    const response = await fetch(`/api/user/${user?.publicMetadata?.userId}`);
    const data = await response.json();
    setUserData(data);
  }, [user]);

  // get feed posts
  const getFeedPost = useCallback(async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    const fpost = data.reverse();
    setFeedPost(fpost);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      getUser();
    }
  }, [getUser, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      getFeedPost();
    }
  }, [getFeedPost, isLoaded]);

  return (
    <User_Information.Provider
      value={{
        user: user,
        isUserLoaded: isLoaded,
        userDBData: userData,
        setUserDBData: setUserData,
        getUser: getUser,
        feedPost: feedPost,
        getFeedPost: getFeedPost
      }}>
      {children}
    </User_Information.Provider>
  );
}

interface User_Information_Type {
  user: any;
  isUserLoaded: any;
  userDBData: any;
  setUserDBData: any;
  feedPost: any;
  getFeedPost: () => void
  getUser: () => void;
}

export const useUserInformation = (): User_Information_Type => {
  const user = useContext(User_Information);
  return user;
};

export default Index;
