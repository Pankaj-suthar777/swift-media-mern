import UserDashboard from "../../pages/UserDashboard";

export const userRoutes = [
  {
    path: "dashboard",
    element: <UserDashboard />,
    role: "user",
  },
];
