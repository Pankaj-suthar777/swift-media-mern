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

const App = () => {
  const dispatch = useAppDispatch();
  const { token, role } = useAppSelector((state) => state.auth);
  const { data: userData } = useGetUserInfoQuery({ token });
  const { data: adminData } = useAdminGetUserInfoQuery({ token });

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

  return <Router allRoutes={allRoutes} />;
};

export default App;
