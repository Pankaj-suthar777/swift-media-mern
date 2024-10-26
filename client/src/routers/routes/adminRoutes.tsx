import AllUsers from "@/pages/admin/users/AllUsers";
import AdminDashboard from "../../pages/admin/AdminDashboard";

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
];
