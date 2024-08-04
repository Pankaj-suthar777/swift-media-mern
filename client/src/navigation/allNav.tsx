import { Cross, Group, Home, Pin, User, UsersRound } from "lucide-react";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home size={20} />,
    role: "user",
    path: "/user/dashboard",
  },
  {
    id: 3,
    title: "Posts",
    icon: <Cross size={20} />,
    role: "user",
    path: "/user/posts",
  },
  {
    id: 2,
    title: "Friends",
    icon: <UsersRound size={20} />,
    role: "user",
    path: "/user/chats",
  },
  {
    id: 4,
    title: "Saved Posts",
    icon: <Pin size={20} />,
    role: "user",
    path: "/user/saved-posts",
  },
  {
    id: 5,
    title: "Profile",
    icon: <User size={20} />,
    role: "user",
    path: "/user/profile",
  },
  {
    id: 6,
    title: "Group Chat",
    icon: <Group size={20} />,
    role: "user",
    path: "/user/group-chat",
  },
];
