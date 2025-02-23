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
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  return (
    <div
      className={`relative flex justify-between items-center md:py-2.5 md:px-6 p-1 font-medium rounded-full cursor-pointer transition-colors group bg-indigo-50 hover:bg-indigo-100 text-gray-600`}
    >
      <div className="flex justify-center items-center gap-4">
        <CustomProfilePopover>
          <Avatar>
            <AvatarImage src={userInfo?.avatar} alt="@shadcn" />
            <AvatarFallback>{userInfo?.name}</AvatarFallback>
          </Avatar>
        </CustomProfilePopover>
        <div className="flex-col md:flex hidden">
          <h3 className="text-sm font-bold">{userInfo?.name}</h3>
          <h4 className="text-xs">
            {userInfo?.email && userInfo?.email.length > 10
              ? userInfo?.email.substring(0, 5) + " ..."
              : userInfo?.email}
          </h4>
        </div>
      </div>
      <div className="md:block hidden">
        <CustomProfilePopover>
          <Ellipsis />
        </CustomProfilePopover>
      </div>
    </div>
  );
};

export default Logout;

const CustomProfilePopover = ({ children }: { children: React.ReactNode }) => {
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
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
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
  );
};
