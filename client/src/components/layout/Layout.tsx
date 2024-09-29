import { useEffect, useState } from "react";
import MainContent from "./MainContent";
import Sidebar, { SidebarItem } from "./Sidebar";
import { useLocation } from "react-router-dom";
import { getNav } from "../../navigation";
import Logout from "./Logout";
import CreatePost from "../post/CreatePost";
import { useGetMyNotificationsCountQuery } from "@/store/api/userApi";
import { Feather } from "lucide-react";

const Layout = () => {
  const role = "user";
  const { pathname } = useLocation();
  const { data } = useGetMyNotificationsCountQuery(null);

  const [allNav, setAllNav] = useState<any[]>([]);

  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, []);

  return (
    <div className="h-screen w-[1250px] overflow-hidden">
      <div className="flex">
        <Sidebar>
          <div className="relative h-screen">
            {allNav.map((n, i) => {
              const isActive = n.path === pathname;

              return (
                <SidebarItem
                  notifications={data?.notificationsCount}
                  key={i}
                  icon={n.icon}
                  text={n.title}
                  to={n.path}
                  active={isActive}
                />
              );
            })}
            <CreatePost>
              <div
                className={`mt-4 cursor-pointer relative no-underline rounded-full flex items-center justify-center md:py-2.5 md:px-6 p-4 font-medium transition-colors gap-2 group w-full text-lg bg-blue-400 hover:bg-blue-500`}
              >
                <span>
                  <Feather size={20} color="white" />
                </span>
                <span className="md:inline hidden text-white">Post</span>
              </div>
            </CreatePost>

            <div className="absolute bottom-24 left-0 right-0 hidden md:block">
              <Logout />
            </div>
          </div>
        </Sidebar>

        <div className={`transition-all w-full max-h-[100vh]`}>
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default Layout;
