import { useEffect, useState } from "react";
import Router from "./routers/Router";
import { getAdminRoutes, getUserRoutes } from "./routers/routes";
import publicRoutes from "./routers/routes/publicRoute";
import {
  useLazyAdminGetUserInfoQuery,
  useLazyGetUserInfoQuery,
} from "./store/api/authApi";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUser } from "./store/features/userSlice";
import { useLocation } from "react-router-dom";
import { MountainIcon } from "lucide-react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { token, role } = useAppSelector((state) => state.auth);
  const [getUser, { data: userData, isLoading: isUserDataLoading }] =
    useLazyGetUserInfoQuery();
  const [getAdminUser, { data: adminData, isLoading: isAdminUserDataLoading }] =
    useLazyAdminGetUserInfoQuery();

  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    if (role === "admin") {
      const routes = getAdminRoutes();
      setAllRoutes((prevRoutes) => [...prevRoutes, { ...routes }]);
    } else {
      const routes = getUserRoutes();
      setAllRoutes((prevRoutes) => [...prevRoutes, { ...routes }]);
    }
  }, [role]);

  useEffect(() => {
    const handleUserInfo = (data: any) => {
      if (data && data.userInfo) {
        dispatch(setUser(data.userInfo));
      }
    };

    if (role === "admin") {
      getAdminUser({ token });
      handleUserInfo(adminData);
    } else {
      getUser({ token });
      handleUserInfo(userData);
    }
  }, [token, role, userData, adminData, dispatch, getAdminUser, getUser]);

  if (isUserDataLoading || isAdminUserDataLoading) {
    if (pathname !== "/") {
      return (
        <h1 className="flex justify-center h-screen w-screen items-center">
          <MountainIcon className="h-20 w-20" />
        </h1>
      );
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router allRoutes={allRoutes} />
    </QueryClientProvider>
  );
};

export default App;
