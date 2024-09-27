import Layout from "../../components/layout/Layout";
import { privateRoutes } from "./privateRoute";
import ProtectRoute from "./ProtectRoute";

export const getRoutes = () => {
  privateRoutes.map((r: any) => {
    r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>;
  });
  return {
    path: "/user",
    element: (
      <div className="flex justify-center items-center bg-slate-100">
        <Layout />
      </div>
    ),
    children: privateRoutes,
  };
};
