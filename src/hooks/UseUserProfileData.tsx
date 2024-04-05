import { createContext, useContext } from "react";

export const userProfileData = createContext<any>(null);

const UseUserProfileData = () => {
    const user = useContext(userProfileData);
    return user;
  };

export default UseUserProfileData;