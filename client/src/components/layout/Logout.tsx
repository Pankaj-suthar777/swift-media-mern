import { useLogoutMutation } from "@/store/api/authApi";
import { userLogout } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Ellipsis } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RootState } from "@/store/store";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout, { isSuccess }] = useLogoutMutation();
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

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
      className={`relative flex justify-between items-center py-3 px-6 font-medium rounded-full cursor-pointer transition-colors group bg-indigo-50 hover:bg-indigo-100 text-gray-600`}
    >
      <div className="flex justify-center items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold">{userInfo?.name}</h3>
          <h4 className="text-xs">
            {userInfo?.email && userInfo?.email.length > 10
              ? userInfo?.email.substring(0, 10) + " ..."
              : userInfo?.email}
          </h4>
        </div>
      </div>
      <Popover>
        <PopoverTrigger>
          <Ellipsis />
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <div
            onClick={() => navigate("/user/profile")}
            className="py-4 flex justify-center items-center hover:bg-slate-100 cursor-pointer"
          >
            View Profile
          </div>
          <div
            onClick={() => logoutUserHandler()}
            className="py-4 flex justify-center items-center hover:bg-slate-100 cursor-pointer"
          >
            Logout
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Logout;
