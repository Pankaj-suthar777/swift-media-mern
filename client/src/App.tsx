import { useEffect, useState } from "react";
import Router from "./routers/Router";
import { getRoutes } from "./routers/routes";
import publicRoutes from "./routers/routes/publicRoute";
import {
  useAdminGetUserInfoQuery,
  useGetUserInfoQuery,
} from "./store/api/authApi";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUser } from "./store/features/userSlice";
import { useLocation } from "react-router-dom";
import { MountainIcon } from "lucide-react";

const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { token, role } = useAppSelector((state) => state.auth);
  const { data: userData, isLoading: isUserDataLoading } = useGetUserInfoQuery({
    token,
  });
  const { data: adminData, isLoading: isAdminUserDataLoading } =
    useAdminGetUserInfoQuery({ token });

  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes((prevRoutes) => [...prevRoutes, { ...routes }]);
  }, []);

  useEffect(() => {
    const handleUserInfo = (data: any) => {
      if (data && data.userInfo) {
        dispatch(setUser(data.userInfo));
      }
    };

    if (role === "user") {
      handleUserInfo(userData);
    } else if (role === "admin") {
      handleUserInfo(adminData);
    }
  }, [token, role, userData, adminData, dispatch]);

  if (isUserDataLoading || isAdminUserDataLoading) {
    if (pathname !== "/") {
      return (
        <h1 className="flex justify-center h-screen w-screen items-center">
          <MountainIcon className="h-20 w-20" />
        </h1>
      );
    }
  }

  return <Router allRoutes={allRoutes} />;
};

export default App;
