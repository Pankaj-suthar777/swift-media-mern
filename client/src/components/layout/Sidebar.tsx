//import { useAppSelector } from "@/redux/hooks";
import { MountainIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

interface ItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  to: string;
  notifications?: number;
}

export default function Sidebar({ children }: Props) {
  // const { role } = useAppSelector((state) => state.auth);
  // const role = "user";
  return (
    <div>
      {/* <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#000000aa] top-0 left-0 z-10 `}
      ></div> */}
      <aside className={`flex-col w-[260px] z-50 top-0 transition-all`}>
        <nav className="h-full flex flex-col ">
          <Link
            to="/"
            className="no-underline text-black mr-6 flex justify-center items-center py-6"
          >
            <MountainIcon className="h-8 w-8" />
            <span className="sr-only">Acme Inc</span>
            <span className="ml-4 text-black font-medium text-lg">
              Swift Media
            </span>
          </Link>
          <ul className="flex-1 px-3">{children}</ul>
        </nav>
      </aside>
    </div>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  to,
  notifications,
}: ItemProps) {
  return (
    <Link
      to={to}
      className={`relative no-underline rounded-full flex items-center py-3 px-6 my-1 font-medium cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span className={`overflow-hidden transition-all w-52 ml-3 text-lg`}>
        {text}
      </span>
      {notifications !== 0 &&
        notifications !== undefined &&
        to.includes("notification") && (
          <div className="h-6 w-6 absolute flex justify-center items-center bg-green-600 top-1 right-0 rounded-full">
            <span className="text-[12px] text-white text-center">
              {notifications}
            </span>
          </div>
        )}
    </Link>
  );
}
