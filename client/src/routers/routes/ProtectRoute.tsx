//import { useAppSelector } from "@/redux/hooks";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  route: any;
  children: ReactNode;
}

const ProtectRoute = ({ route, children }: Props) => {
  const { role, userInfo } = useAppSelector((state) => state.auth);

  if (role) {
    if (route.role) {
      if (userInfo) {
        if (role === route.role) {
          return <div>{children}</div>;
        } else {
          return <Navigate to="/unauthorized" replace />;
        }
      } else {
        <Navigate to="/login" replace />;
      }
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;
