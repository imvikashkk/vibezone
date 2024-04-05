"use client";

import Loader from "@/components/loader/Loader";
import UserCard from "@/components/cards/UserCard";
import React, { useCallback, useEffect, useState } from "react";
import { UserType } from "@/lib/models/User";

const People = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = useCallback(async () => {
    const response = await fetch(`/api/user`);
    const data = await response.json();
    setAllUsers(data);
  },[])

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return allUsers?.length >= 1 ? (
        <div className="flex w-full mx-auto flex-col gap-4 py-6 md:gap-8">
          {allUsers?.map((user: UserType, index:number) => (
            <UserCard key={index} userData={user} update={getAllUsers} />
          ))}
        </div>
    ) : <Loader />
};

export default People;
