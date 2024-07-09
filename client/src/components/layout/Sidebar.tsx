//import { useAppSelector } from "@/redux/hooks";
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
}

export default function Sidebar({
  children,
  showSidebar,
  setShowSidebar,
}: Props) {
  // const { role } = useAppSelector((state) => state.auth);
  // const role = "user";
  return (
    <>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#000000aa] top-0 left-0 z-10 `}
      ></div>
      <aside
        className={`min-h-screen fixed flex-col  w-[260px] z-50 top-0 transition-all border-r bg-white ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        <nav className="h-full flex flex-col bg-white  ">
          <span
            // to={role === "admin" ? "/admin/dashboard" : "/dashboard"}
            className="p-4 pb-2 flex justify-center items-center cursor-pointer mb-5 mt-2"
          >
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUp08aReiNKV4tTlIBDbInK5KV8ffAtfBImw&s"
              }
              className={`overflow-hidden transition-all w-32`}
            />
          </span>
          <ul className="flex-1 px-3">{children}</ul>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, to }: ItemProps) {
  return (
    <Link
      to={to}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span className={`overflow-hidden transition-all w-52 ml-3`}>{text}</span>
    </Link>
  );
}
