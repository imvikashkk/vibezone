import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import { useUserInformation } from "@/context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const UserCard = ({ userData, update }: any) => {
  const LoggedInUser = useUserInformation();

  const isfollowing = LoggedInUser?.userDBData?.following?.find(
    (item: any) => item._id === userData._id
  );
  const [isFollowing, setIsFollowing] = useState(isfollowing ? true : false);

  const handleFollow = async () => {
    setIsFollowing((prev) => !prev);
      const response = await fetch(
        `/api/user/${LoggedInUser?.userDBData?._id}/follow/${userData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        LoggedInUser.getUser()
      }
  };

  return LoggedInUser.userDBData && (
    <div className="w-full flex items-center justify-center px-2 min-[645px]:px-24 ">
      <Link
        className="w-full flex  gap-4 items-center"
        href={`/profile/${userData.username}`}>
        <Image
          src={userData.profilePhoto}
          alt="profile photo"
          width={50}
          height={50}
          className="md:w-16 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-small-semibold md:text-base-bold text-light-1">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="text-subtle-medium md:text-[15px] text-light-2">
            @{userData.username}
          </p>
        </div>
      </Link>

      {LoggedInUser?.userDBData?._id !== userData._id && (
        <div className="md:scale-150 cursor-pointer" onClick={handleFollow}>
          {isFollowing ? (
            <PersonRemove sx={{ color: "#7857FF", cursor: "pointer" }} />
          ) : (
            <PersonAddAlt sx={{ color: "#7857FF", cursor: "pointer" }} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
