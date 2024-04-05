"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import UserCard from "@/components/cards/UserCard";
import { UserType } from "@/lib/models/User";

const SearchPosts = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchedPeople, setSearchedPeople] = useState([]);

  const getSearchedPeople = useCallback(async () => {
    const response = await fetch(
      `/api/user/search/people/${searchParams.get("q")}`
    );
    if (response.ok) {
      const data = await response.json();
      setSearchedPeople(data);
    }
    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    getSearchedPeople ();
  }, [getSearchedPeople]);

  return loading ? (<Loader />) : (
    <div className="flex flex-col gap-6 items-center">
      {searchedPeople.map((user:UserType, index:number) => (
        <UserCard key={index} userData={user}/>
      ))}
    </div>
  );
};

export default SearchPosts;
