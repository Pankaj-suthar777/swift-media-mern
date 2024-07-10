import ChatUserList from "@/components/chat/ChatUserList";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { useState } from "react";

const Chats = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex w-full gap-4">
      <div
        className={`fixed z-[8888] bg-white h-viewport-minus-100px ${
          showSidebar ? "" : " -left-[300px] lg:-left-[0px] lg:relative"
        }`}
      >
        <ChatUserList />
      </div>
      <div className="w-full">
        <div className="flex flex-col h-viewport-minus-100px relative w-full">
          <div className="h-12 bg-white flex justify-between items-center px-4 py-8">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src="https://randomuser.me/api/portraits/women/72.jpg"
              alt="User avatar"
            />
            <h3 className="text-sm font-medium text-gray-800">Emily Jones</h3>
            <div
              className="lg:hidden cursor-pointer"
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            >
              <Menu />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            {/* Chat messages */}
            <div className="flex flex-col mb-4 gap-4 py-4">
              <div className="flex justify-start">
                <div className="bg-white rounded-lg px-4 py-2 max-w-[80%]">
                  <p className="text-gray-900 text-sm">Hey, how are you?</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
                  <p className="text-white text-sm">
                    I'm good, thanks! How about you?
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white rounded-lg px-4 py-2 max-w-[80%]">
                  <p className="text-gray-900 text-sm">
                    I'm doing great, thanks for asking!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center absolute bottom-0 w-full gap-4">
            {/* Chat input */}
            <Input
              className="ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              type="text"
              placeholder="Type a message..."
            />
            <Button className="">Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
