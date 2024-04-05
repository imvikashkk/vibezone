import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { tabsData } from "@/constants";
import Link from "next/link";
import type { UserType } from "@/lib/models/User";
import { useUserInformation } from "@/context";

export default function ProfileCard({
  userData,
  activeTab,
}: {
  userData: UserType;
  activeTab: string;
}): ReactNode {
  const { userDBData, getUser } = useUserInformation();
  const isfollowing = userDBData?.following?.find(
    (item: any) => item?._id === userData?._id
  );
  const [isFollowing, setIsFollowing] = useState(isfollowing ? true : false);

  const handleFollow = async () => {
    setIsFollowing((prev) => !prev);
      const response = await fetch(
        `/api/user/${userDBData?._id}/follow/${userData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        getUser()
      }
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="flex justify-between items-start">
        <div className="flex gap-5 items-start">
          <Link href={userData?.profilePhoto} target="_blank">
            <Image
              src={userData?.profilePhoto}
              alt="profile photo"
              width={100}
              height={100}
              className="rounded-full md:max-lg:hidden"
            />
          </Link>

          <div className="flex flex-col gap-3">
            <p className="text-light-1 text-heading3-bold max-sm:text-heading4-bold">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p className="text-light-3 text-subtle-semibold">
              {userData?.username}
            </p>
            <div className="flex gap-7 text-small-bold max-sm:gap-4">
              <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="text-purple-1">{userData?.posts?.length}</p>
                <p className="text-light-1">Posts</p>
              </div>
              <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="text-purple-1">{userData?.followers?.length}</p>
                <p className="text-light-1">Followers</p>
              </div>
              <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="text-purple-1">{userData?.following?.length}</p>
                <p className="text-light-1">Following</p>
              </div>
            </div>
          </div>
        </div>

        {userDBData?._id !== userData?._id &&
          (isFollowing ? (
            <PersonRemove
              sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
              onClick={handleFollow}
            />
          ) : (
            <PersonAddAlt
              sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
              onClick={handleFollow}
            />
          ))}
      </div>

      <div className="flex gap-6">
        {tabsData.map((tab: any, index: number) => {
          return (
            <Link
              className={`tab ${
                activeTab === tab.name ? "bg-purple-1" : "bg-dark-2"
              }`}
              href={`/profile/${userData.username}/${tab.link}`}
              key={index}>
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
