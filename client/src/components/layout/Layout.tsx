import { useEffect, useState } from "react";
import MainContent from "./MainContent";
import Sidebar, { SidebarItem } from "./Sidebar";
import { useLocation } from "react-router-dom";
import { getNav } from "../../navigation";
// import { useAppSelector } from "@/redux/hooks";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  //   const { role } = useAppSelector((state) => state.auth);
  const role = "user";
  const { pathname } = useLocation();

  const [allNav, setAllNav] = useState<any[]>([]);

  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, []);

  return (
    <div className="flex h-screen w-screen bg-slate-100">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
        {allNav.map((n, i) => (
          <SidebarItem
            key={i}
            icon={n.icon}
            text={n.title}
            to={n.path}
            active={pathname === n.path}
          />
        ))}
      </Sidebar>

      <div
        className={`ml-0 lg:ml-[260px] transition-all w-full max-h-[100vh] overflow-y-auto`}
      >
        <MainContent
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
    </div>
  );
};

export default Layout;
