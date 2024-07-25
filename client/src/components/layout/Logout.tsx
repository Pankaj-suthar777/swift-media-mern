import { useLogoutMutation } from "@/store/api/authApi";
import { userLogout } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { LucideLogOut } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout, { isSuccess }] = useLogoutMutation();

  const logoutUserHandler = async () => {
    await logout({});
    localStorage.removeItem("accessToken");
    dispatch(userLogout());
  };

  useEffect(() => {
    if (isSuccess) {
      userLogout();
      navigate("/login");
    }
  }, [isSuccess, navigate]);
  return (
    <div
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600`}
      onClick={() => logoutUserHandler()}
    >
      <LucideLogOut />
      <span className={`overflow-hidden transition-all w-52 ml-3`}>Logout</span>
    </div>
  );
};

export default Logout;
