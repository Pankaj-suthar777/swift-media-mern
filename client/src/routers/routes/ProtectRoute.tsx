import { useAppSelector } from "@/store/hooks";
import { Loader } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  route: any;
  children: ReactNode;
}

const ProtectRoute = ({ route, children }: Props) => {
  const { role, userInfo } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== undefined && userInfo !== undefined) {
      setLoading(false);
    }
  }, [role, userInfo]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

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
