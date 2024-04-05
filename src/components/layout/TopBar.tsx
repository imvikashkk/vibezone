import { useEffect, useState } from "react";
import { Add, Person, Search } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { dark } from "@clerk/themes";
import { useUserInformation } from "@/context";
import { pageTitles } from "@/constants";

const TopBar = () => {
  const { userDBData } = useUserInformation();
  const currentPath = usePathname();
  const regex = /^\/([^\/]+)/;
  const firstPath = currentPath.match(regex)?.[0] || currentPath;
  const title = pageTitles.find((page) => page.url === firstPath)?.title || "";

  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const currPath = currentPath.split("/");
  const searchParams = useSearchParams();

  useEffect(()=>{
      if(currentPath === "/search/people" || currentPath === "/search/posts"){
        if(searchParams.has("q")){
          setSearch(searchParams.get("q") || "");
        }
  }},[currentPath, searchParams])

  const tabsData = [
    {
      name: "posts",
      link: `/search/posts`,
    },
    {
      name: "people",
      link: `/search/people`,
    },
  ];
  

  return (
    <div className="min-[843px]:mt-2">
      <div className="flex justify-between items-center gap-2">
        <Link className="min-[843px]:hidden" href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            className="w-auto h-auto"
            width={150}
            height={150}
          />
        </Link>

        <div className="relative max-[528px]:hidden">
          <input
            type="text"
            className="search-bar max-[843px]:py-1 max-[843px]:px-2"
            placeholder="Search posts, people, ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            className="search-icon"
            onClick={() => {
              if (search.trim() !== "") {
                if(currentPath === "/search/people"){
                  router.push(`/search/people?q=${search}`);
                }else{
                  router.push(`/search/posts?q=${search}`);
                }
              }
            }}
          />
        </div>

        <button
          className="create-post-btn"
          onClick={() => router.push("/create-post")}>
          <Add /> <p>Create A Post</p>
        </button>

        <div className="flex gap-2 min-[843px]:hidden items-center">
          <Link href={`/profile/${userDBData?.username}`}>
            <Person sx={{ fontSize: "35px", color: "white" }} />
          </Link>
          <UserButton
            appearance={{ baseTheme: dark }}
            afterSignOutUrl="/sign-in"
          />
        </div>
      </div>
      <div className="relative mt-2 min-[528px]:hidden">
        <input
          type="text"
          className="w-full bg-dark-2 py-2.5 pl-4 pr-4 rounded-lg focus:outline-none text-light-1 text-small-semibold"
          placeholder="Search posts, people, ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="search-icon"
          onClick={() => {
            if (search.trim() !== "") {
              if(currentPath === "/search/people"){
                router.push(`/search/people?q=${search}`);
              }else{
                router.push(`/search/posts?q=${search}`);
              }
            }
          }}
        />
      </div>
      {(currentPath === "/search/posts" ||
        currentPath === "/search/people") && (
        <div className="flex gap-6 mt-2 ">
          {tabsData.map((tab: any, index: number) => {
            return (
              <div
                className={`tab ${
                  currPath[currPath.length - 1] === tab.name
                    ? "bg-purple-1"
                    : "bg-dark-2"
                } cursor-pointer`}
                onClick={() => router.push(`${tab.link}?q=${search}`)}
                key={index}>
                {tab.name}
              </div>
            );
          })}
        </div>
      )}
      <h1 className="mt-1 text-base-bold text-light-1">{title}</h1>
    </div>
  );
};


export default TopBar;
