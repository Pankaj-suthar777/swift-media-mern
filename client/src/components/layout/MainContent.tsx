import { Outlet } from "react-router-dom";
import MobileBottomTab from "./MobileBottomTab";

const MainContent = () => {
  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        <div className="">
          <div className="max-w-full">
            <Outlet />
            <div className="absolute bottom-0 left-0 right-0 sm:hidden block">
              <MobileBottomTab />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
