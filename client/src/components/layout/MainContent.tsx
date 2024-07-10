import { userLogout } from "@/store/features/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";

interface Props {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainContent = ({ showSidebar, setShowSidebar }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    localStorage.removeItem("accessToken");
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 w-full px-2">
          <div className="flex items-center px-4">
            <button
              className="text-gray-500 focus:outline-none lg:hidden focus:text-gray-700"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* {userInfo?.companyName && (
              <span className="mx-4 w-full border rounded-md px-4 py-2">
                {userInfo.companyName}
              </span>
            )} */}
          </div>
          <div className="flex items-center pr-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-8">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="p-4">
          <div className="max-w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
