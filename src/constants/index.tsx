import {
  Home,
  AddPhotoAlternateOutlined,
  GroupOutlined,
  BookmarksOutlined,
  FavoriteBorder,
} from "@mui/icons-material";

// Define the type for a sidebar link object
interface SidebarLinkType{
  icon: JSX.Element;
  route: string;
  label: string;
}

// Define a single sidebar link object
export const sidebarLinks:SidebarLinkType[] = [
  {
    icon: <Home sx={{ color: "white", fontSize: "26px" }} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <AddPhotoAlternateOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <GroupOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/people",
    label: "People",
  },
  {
    icon: <BookmarksOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/saved-posts",
    label: "Saved Posts",
  },
  {
    icon: <FavoriteBorder sx={{ color: "white", fontSize: "26px" }} />,
    route: "/liked-posts",
    label: "Liked Posts",
  },
];


export const pageTitles: { url: string; title: string }[] = [
  {
    url: "/",
    title: "Feed",
  },
  {
    url: "/edit-profile",
    title: "Edit Profile",
  },
  {
    url: "/create-post",
    title: "Create Post",
  },
  {
    url: "/edit-post",
    title: "Edit Post",
  },
  {
    url: "/search",
    title: "Search Results",
  },
  {
    url: "/search",
    title: "Search",
  },
  {
    url: "/saved-posts",
    title: "Saved Posts",
  },
  {
    url: "/liked-posts",
    title: "Liked Posts",
  },
];

export const tabsData: { link: string; name: string }[] = [
  {
    link: "/",
    name: "Posts",
  },
  {
    link: "followers",
    name: "Followers",
  },
  {
    link: "following",
    name: "Following",
  },
];
