import LoginPage from "@/pages/auth/LoginPage";
import LandingPage from "../../pages/LandingPage";
import Register from "@/pages/auth/Register";
import AdminLoginPage from "@/pages/auth/AdminLoginPage";

const publicRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
];

export default publicRoutes;
