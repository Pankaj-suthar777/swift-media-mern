import Chats from "@/pages/Chats";
import Profile from "@/pages/Profile";
import UserDashboard from "@/pages/UserDashboard";

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
    path: "chats",
    element: <Chats />,
    role: "user",
  },
  {
    path: "chats/:id",
    element: <Chats />,
    role: "user",
  },
];
