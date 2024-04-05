"use client";
import UserCard from "@/components/cards/UserCard";
import { UserType } from "@/lib/models/User";
import UseUserProfileData from "@/hooks/UseUserProfileData";

const Following = () => {
  const { userProfileData } = UseUserProfileData();

  return (
    <div className="flex flex-col gap-9">
      {userProfileData?.following?.map((person: UserType, index:number) => (
        <UserCard key={index} userData={person} />
      ))}
    </div>
  );
};

export default Following
