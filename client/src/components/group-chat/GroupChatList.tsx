import { truncateText } from "@/utils/helper";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../custom/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { GroupChat } from "@/@types/groupChat";
import CreateGroupModal from "../chat/CreateGroupModal";
import { useGetMyGroupChatsQuery } from "@/store/api/groupChatApi";
import { useEffect, useState } from "react";

const GroupChatList = () => {
  const { id } = useParams();

  const [selectedChat, setSelectedChat] = useState<GroupChat | null>(null);

  const { data: chats = [], isLoading: isChatsLoading } =
    useGetMyGroupChatsQuery(null);

  useEffect(() => {
    if (id) {
      const currentChat = chats?.find((chat: any) => chat.id === parseInt(id));
      setSelectedChat(currentChat || null);
    }
  }, [id, chats, selectedChat]);

  return (
    <div>
      <div className="bg-white rounded-md overflow-hidden w-[300px]">
        <div className="flex justify-between mx-4 w-full py-4">
          <Dialog>
            <DialogTrigger>
              <Button className="w-full" variant={"outline"}>
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0">
              <CreateGroupModal />
            </DialogContent>
          </Dialog>
        </div>
        <ul className="divide-y divide-gray-200 w-full">
          {isChatsLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader className="ml-2 h-12 w-12 animate-spin" />
            </div>
          ) : (
            chats?.map((chat, i: number) => {
              return (
                <Link
                  key={i}
                  to={`/user/group-chat/${chat.id}`}
                  className={`flex items-center py-4 px-6 ${
                    selectedChat && selectedChat.id === chat.id
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                      : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full object-cover mr-4"
                      src={chat?.avatar ? chat?.avatar : "/user-profile2.jpg"}
                      alt="User avatar"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800">
                      {chat.title}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      {truncateText(chat?.lastMessage, 16)}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default GroupChatList;
