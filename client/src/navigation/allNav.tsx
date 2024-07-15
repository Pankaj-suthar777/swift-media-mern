import { Cross, Home, User, UsersRound } from "lucide-react";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home size={20} />,
    role: "user",
    path: "/user/dashboard",
  },
  {
    id: 2,
    title: "Profile",
    icon: <User size={20} />,
    role: "user",
    path: "/user/profile",
  },
  {
    id: 3,
    title: "Friends",
    icon: <UsersRound size={20} />,
    role: "user",
    path: "/user/chats",
  },
  {
    id: 3,
    title: "Posts",
    icon: <Cross size={20} />,
    role: "user",
    path: "/user/posts",
  },
];
