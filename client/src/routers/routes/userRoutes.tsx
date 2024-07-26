import GroupChat from "@/components/group-chat/GroupChat";
import Chats from "@/pages/Chats";
import Post from "@/pages/Post";
import Posts from "@/pages/Posts";
import Profile from "@/pages/Profile";
import UserDashboard from "@/pages/UserDashboard";
import UserProfile from "@/pages/UserProfile";

export const userRoutes = [
  {
    path: "dashboard",
    element: <UserDashboard />,
    role: "user",
  },
  {
    path: "profile",
    element: <Profile />,
    role: "user",
  },
  {
    path: "profile/:id",
    element: <UserProfile />,
    role: "user",
  },
  {
    path: "chats",
    element: <Chats />,
    role: "user",
  },
  {
    path: "chats/:id",
    element: <Chats />,
    role: "user",
  },
  {
    path: "posts",
    element: <Posts />,
    role: "user",
  },
  {
    path: "posts/:id",
    element: <Post />,
    role: "user",
  },
  {
    path: "create-group",
    element: <GroupChat />,
    role: "user",
  },
];
