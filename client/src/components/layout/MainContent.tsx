import { Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        <div className="">
          <div className="max-w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
