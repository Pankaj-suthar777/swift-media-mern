import LoginPage from "@/pages/auth/LoginPage";
import LandingPage from "@/pages/landing/LandingPage";
import Register from "@/pages/auth/Register";
import AdminLoginPage from "@/pages/auth/AdminLoginPage";
import NotFoundError from "@/pages/NotFoundError";
import ContactPage from "@/pages/landing/ContactPage";
import ProviderRedirectPage from "@/pages/auth/ProviderRedirectPage";

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
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/provider-redirect",
    element: <ProviderRedirectPage />,
  },
  {
    path: "*",
    element: <NotFoundError />,
  },
];

export default publicRoutes;
