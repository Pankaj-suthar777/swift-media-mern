import AllUsers from "@/pages/admin/users/AllUsers";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import PopularUsers from "@/pages/admin/users/PopularUsers";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "users",
    element: <AllUsers />,
    role: "admin",
  },
  {
    path: "popular-users",
    element: <PopularUsers />,
    role: "admin",
  },
];
