"use client";

import TopBar from "./TopBar";
import { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex-1 h-screen flex flex-col justify-between overflow-hidden">

        <div className="sticky top-0 pt-2 pb-3 bg-purple-2 z-50 max-w-[48rem] 2xl:max-w-[64rem] px-4 md:px-10 lg:px-4 xl:px-5">
          <TopBar />
        </div>

          <div className="mt-[4px] h-screen overflow-auto hide-scrollbar max-w-[48rem] 2xl:max-w-[64rem] px-4 md:px-10 lg:px-4 xl:px-5">

          <div className="pb-[80%]">{children}</div>

        </div>
       
    </section>
  );
};

export default MainContainer;
