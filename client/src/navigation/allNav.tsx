import { Cross, Group, Home, Pin, User, UsersRound } from "lucide-react";

export const allNav = [
  {
    id: 2,
    title: "Posts",
    icon: <Cross size={28} />,
    role: "user",
    path: "/user/posts",
  },
  {
    id: 3,
    title: "Chat",
    icon: <UsersRound size={28} />,
    role: "user",
    path: "/user/chats",
  },
  {
    id: 4,
    title: "Group Chat",
    icon: <Group size={28} />,
    role: "user",
    path: "/user/group-chat",
  },
  {
    id: 5,
    title: "Profile",
    icon: <User size={28} />,
    role: "user",
    path: "/user/profile",
  },
  {
    id: 1,
    title: "User Activity",
    icon: <Home size={28} />,
    role: "user",
    path: "/user/dashboard",
  },
  {
    id: 6,
    title: "Saved Posts",
    icon: <Pin size={28} />,
    role: "user",
    path: "/user/saved-posts",
  },
];
