"use client";

import { UserButton} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import { useUserInformation } from "@/context";

const LeftSideBar = () => {
  const {user, userDBData} = useUserInformation()
  return (  
    <div className="h-screen left-0 top-0 sticky overflow-auto pl-6 pr-3 pt-4 pb-6 flex flex-col gap-6 max-[843px]:hidden 2xl:w-[350px]">
      {(!userDBData)? (
        <>
        <DummyLeftSideBar />
        </>
      ) : (
        <>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              className="w-auto h-auto"
              width={200}
              height={200}
            />
          </Link>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 items-center text-light-1">
              <Link href={`/profile/${userDBData?.username}`}>
                <Image
                  src={user?.imageUrl}
                  alt="profile photo"
                  width={50}
                  height={50}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </Link>
              <p className="text-small-bold">{user?.fullName}</p>
            </div>
            <div className="flex text-light-1 justify-between">
              <div className="flex flex-col items-center">
                <p className="text-base-bold">{userDBData?.posts?.length}</p>
                <p className="text-tiny-medium">Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-base-bold">{userDBData?.followers?.length}</p>
                <p className="text-tiny-medium">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-base-bold">{userDBData?.following?.length}</p>
                <p className="text-tiny-medium">Following</p>
              </div>
            </div>
          </div>
          <hr />
          <Menu />
          <hr />
          <div className="flex gap-4 items-center">
            <UserButton
              appearance={{ baseTheme: dark }}
              afterSignOutUrl="/sign-in"
            />
            <p className="text-light-1 text-body-bold select-none">
              @{user?.username}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const DummyLeftSideBar = () => {
  return (
    <>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          className="w-auto h-auto"
          width={200}
          height={200}
        />
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center text-light-1">
          <Image
            src="/images/avatar.webp"
            alt="profile photo"
            width={50}
            height={50}
            className="w-16 h-16 rounded-full object-cover"
          />
          <p className="text-small-bold">Your Name</p>
        </div>
        <div className="flex text-light-1 justify-between">
          <div className="flex flex-col items-center">
            <p className="text-base-bold">1</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">1</p>
            <p className="text-tiny-medium">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">1</p>
            <p className="text-tiny-medium">Following</p>
          </div>
        </div>
      </div>
      <hr />
      <Menu />
      <hr />
      <div className="flex gap-4 items-center">
        <Image
          src="/images/avatar.webp"
          alt="profile photo"
          width={40}
          height={40}
          className="w-[3rem] h-[3rem] rounded-full object-cover"
        />
        <p className="text-light-1 text-body-bold select-none">@user</p>
      </div>
    </>
  );
};

export default LeftSideBar;
