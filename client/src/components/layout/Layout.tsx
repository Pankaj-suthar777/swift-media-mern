import { useEffect, useState } from "react";
import MainContent from "./MainContent";
import Sidebar, { SidebarItem } from "./Sidebar";
import { useLocation } from "react-router-dom";
import { getNav } from "../../navigation";
import Logout from "./Logout";
import { Button } from "../ui/button";
import CreatePost from "../post/CreatePost";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const role = "user";
  const { pathname } = useLocation();

  const [allNav, setAllNav] = useState<any[]>([]);

  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, []);

  return (
    <div className="h-screen w-[1250px] overflow-hidden">
      <div className="flex">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
          <div className="relative h-screen">
            {allNav.map((n, i) => {
              const isActive = n.path === pathname;

              return (
                <SidebarItem
                  key={i}
                  icon={n.icon}
                  text={n.title}
                  to={n.path}
                  active={isActive}
                />
              );
            })}
            <CreatePost>
              <Button
                className={`mt-4 relative no-underline rounded-full flex items-center py-6 px-6 font-medium transition-colors group w-full text-lg bg-blue-500 hover:bg-blue-600`}
              >
                Post
              </Button>
            </CreatePost>

            <div className="absolute bottom-24 left-0 right-0">
              <Logout />
            </div>
          </div>
        </Sidebar>

        <div className={`transition-all w-full max-h-[100vh]`}>
          <MainContent />
        </div>
        {/* <div>
        <MainContent />
      </div> */}
      </div>
    </div>
  );
};

export default Layout;
