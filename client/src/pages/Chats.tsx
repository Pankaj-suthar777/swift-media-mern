import ChatUserList from "@/components/chat/ChatUserList";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import {
  useGetChatMessagesQuery,
  useGetMyChatsQuery,
  useLazyGetSearchChatUsersQuery,
  useSendMessageMutation,
} from "@/store/api/chatApi";
import { useAppSelector } from "@/store/hooks";
import { Loader, Menu, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Chats = () => {
  const { id } = useParams();

  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("");

  const [getSearch, { data: searchUserChat }] =
    useLazyGetSearchChatUsersQuery();

  useEffect(() => {
    if (searchValue) {
      getSearch({ searchValue });
    }
  }, [searchValue, getSearch]);

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const {
    data: ChatData,
    refetch: refetchChat,
    isLoading: isChatsLoading,
  } = useGetMyChatsQuery({});

  const { userInfo } = useAppSelector((state) => state.auth);

  const myId = userInfo.id;

  const otherFriend = selectedChat?.friends?.find(
    (fri: any) => fri.id !== myId
  );

  const sendmessageHandler = async () => {
    if (!selectedChat || !otherFriend) {
      return;
    }

    const receiverId = otherFriend.id;

    sendMessage({ message, receiverId });
    setMessage("");

    refetchChat();
  };

  const { data: messageData, isLoading: isMessageLoading } =
    useGetChatMessagesQuery({
      chatId: id,
    });

  useEffect(() => {
    const currentChat = ChatData?.find((chat: any) => chat.id === parseInt(id));

    if (id) {
      setSelectedChat(currentChat);
    }
  }, [id, ChatData, selectedChat]);

  return (
    <div className="flex w-full gap-4">
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className={`fixed duration-200 ${
            !showSidebar ? "invisible" : "visible"
          } w-screen h-screen bg-[#000000aa] top-0 left-0 z-10 `}
        ></div>
      )}
      <div
        className={`fixed z-[10] bg-white transition-all duration-200 ease-in-out h-viewport-minus-100px ${
          showSidebar ? "left-0" : "-left-[300px] lg:left-0 lg:relative"
        }`}
      >
        <div className="p-4 flex gap-2 justify-center items-center">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            type="text"
            placeholder="Search user to chat with"
          />
          <span className="cursor-pointer" onClick={() => setSearchValue("")}>
            <X />
          </span>
        </div>
        <ChatUserList
          isLoading={isChatsLoading}
          chats={ChatData}
          searchValue={searchValue}
          searchedResultUser={searchUserChat}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col h-viewport-minus-100px relative w-full">
          <div className="h-12 bg-white flex justify-between items-center px-4 py-8">
            {selectedChat ? (
              <div className="flex justify-between items-center w-full">
                <img
                  className="w-10 h-10 rounded-full object-cover mr-4"
                  src="https://randomuser.me/api/portraits/women/72.jpg"
                  alt="User avatar"
                />
                <h3 className="text-sm font-medium text-gray-800">
                  {otherFriend?.name}
                </h3>
              </div>
            ) : null}
            <div
              className="lg:hidden cursor-pointer ml-4"
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            >
              <Menu />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            {/* Chat messages */}
            {isMessageLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader className="ml-2 h-12 w-12 animate-spin" />
              </div>
            ) : messageData ? (
              messageData.map((message: any, i: number) => {
                const senderId = message.senderId;
                const isMyMessage = senderId === myId;
                return (
                  <div className="flex flex-col mb-4 gap-4 py-4" key={i}>
                    {!isMyMessage && (
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-gray-900 text-sm">
                            {message.text}
                          </p>
                        </div>
                      </div>
                    )}

                    {isMyMessage && (
                      <div className="flex justify-end">
                        <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-white text-sm">{message.text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center h-full items-center flex-col gap-4">
                <span>
                  <UsersRound size={35} />
                </span>
                <span>Select a user</span>
              </div>
            )}
          </div>
          {id ? (
            <div className="flex justify-center items-center absolute bottom-0 w-full gap-4">
              {/* Chat input */}
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text"
                placeholder="Type a message..."
              />
              <Button loading={isLoading} onClick={() => sendmessageHandler()}>
                Send
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Chats;
