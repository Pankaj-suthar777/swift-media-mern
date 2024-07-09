import { Home, User } from "lucide-react";

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
];
