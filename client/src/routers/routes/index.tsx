import AdminLayout from "@/components/layout/AdminLayout";
import Layout from "../../components/layout/Layout";
import { adminRoutes } from "./adminRoutes";
import ProtectRoute from "./ProtectRoute";
import { userRoutes } from "./userRoutes";

export const getUserRoutes = () => {
  userRoutes.map((r: any) => {
    r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>;
  });
  return {
    path: "/user",
    element: (
      <div className="flex justify-center items-center bg-slate-100">
        <Layout />
      </div>
    ),
    children: userRoutes,
  };
};

export const getAdminRoutes = () => {
  adminRoutes.map((r: any) => {
    r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>;
  });
  return {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  };
};
