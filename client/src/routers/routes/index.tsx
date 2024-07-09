import Layout from "../../components/layout/Layout";
import { privateRoutes } from "./privateRoute";
import ProtectRoute from "./ProtectRoute";

export const getRoutes = () => {
  privateRoutes.map((r: any) => {
    r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>;
  });

  return {
    path: "/",
    element: <Layout />,
    children: privateRoutes,
  };
};
