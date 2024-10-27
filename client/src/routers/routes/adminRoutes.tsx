import AllUsers from "@/pages/admin/users/AllUsers";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import PopularUsers from "@/pages/admin/users/PopularUsers";
import TrendingPosts from "@/pages/admin/trending/TrendingPosts";
import ChangePassword from "@/pages/admin/settings/ChangePassword";

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
  {
    path: "trending-posts",
    element: <TrendingPosts />,
    role: "admin",
  },
  {
    path: "setting/change-password",
    element: <ChangePassword />,
    role: "admin",
  },
];
