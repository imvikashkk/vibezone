import React, { ReactNode } from "react";
import LeftSideBar from "./LeftBarMenu";
import MainContainer from "./MainContainer";
import RightSideBar from "./RightSideBar";
import Loader from "../loader/Loader";
import { useUserInformation } from "@/context";
import BottomBar from "./BottomBar";

const Merged = ({ children }: { children: ReactNode }) => {
  const { userDBData} = useUserInformation();
  return (
    <>
      <main className="flex flex-row">
        <LeftSideBar />
        <MainContainer>{children}</MainContainer>
        <RightSideBar />
      </main>
      {!userDBData && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white opacity-30 z-[100]">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Merged;
