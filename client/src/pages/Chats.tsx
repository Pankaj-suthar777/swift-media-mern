import ChatUserList from "@/components/chat/ChatUserList";
import MessageContainer from "@/components/chat/MessageContainer";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { useSocketContext } from "@/context/SocketContext";
import {
  useGetChatMessagesQuery,
  useGetMyChatsQuery,
  useLazyGetSearchChatUsersQuery,
  useSendMessageMutation,
} from "@/store/api/chatApi";
import { useAppSelector } from "@/store/hooks";
import { Menu, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Chats = () => {
  const { id } = useParams();

  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("");
  const [selectedSearchedUser, setSelectedSearchedUser] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [onlineUsersId, setOnlineUsersId] = useState<any[]>([]);
  const [currentChatUser, setCurrentChatUserId] = useState("");
  const [getSearch, { data: searchUserChat }] =
    useLazyGetSearchChatUsersQuery();

  const navigate = useNavigate();

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

  const {
    data: messageData,
    isLoading: isMessageLoading,
    refetch: refetchMessages,
  } = useGetChatMessagesQuery({
    chatId: id,
  });

  useEffect(() => {
    if (id) {
      refetchMessages();
    }
  }, [id, refetchMessages]);

  const sendMessageHandler = async (e: FormEvent) => {
    e.preventDefault();

    const receiverId = selectedSearchedUser
      ? selectedSearchedUser.id
      : otherFriend.id;

    if (!message) {
      return;
    }
    sendMessage({ message, receiverId }).unwrap();

    setMessages([...messages, { text: message, senderId: userInfo.id }]);

    if (searchValue) {
      refetchChat();
    }

    setMessage("");
  };

  useEffect(() => {
    if (id) {
      const currentChat = ChatData?.find(
        (chat: any) => chat.id === parseInt(id)
      );
      setSelectedChat(currentChat);
    }
  }, [id, ChatData, selectedChat]);

  useEffect(() => {
    if (messageData) {
      setMessages(messageData);
    }
  }, [messageData]);

  const { socket } = useSocketContext() as any;

  useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages]);

  useEffect(() => {
    socket?.on("getOnlineUsers", (usersIds: any) => {
      setOnlineUsersId(usersIds);
    });

    return () => socket?.off("getOnlineUsers");
  }, [socket, messages]);

  useEffect(() => {
    if (selectedChat) {
      const fri = selectedChat.friends.find(
        (fri: any) => fri.id !== userInfo.id
      );
      setCurrentChatUserId(fri.id);
    }
  }, [selectedChat, userInfo.id]);

  return (
    <div className="flex w-full gap-4 pl-4 pr-4">
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className={`fixed duration-200 ${
            !showSidebar ? "invisible" : "visible"
          } w-screen h-screen bg-[#000000aa] top-0 left-0 z-10 `}
        ></div>
      )}
      <div
        className={`fixed  z-[10] bg-white transition-all duration-200 ease-in-out h-viewport-minus-100px ${
          showSidebar ? "left-0" : "-left-[350px] lg:left-0 lg:relative"
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
          <span
            className="cursor-pointer"
            onClick={() => {
              setSearchValue("");
              setShowSidebar(false);
            }}
          >
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
          setSelectedSearchedUser={setSelectedSearchedUser}
          onlineUsersId={onlineUsersId}
        />
      </div>
      <div className="w-full relative">
        <div className="flex flex-col h-viewport-minus-100px w-full overflow-y-hidden">
          <div className="h-12 bg-white flex justify-between items-center px-4 py-8 border border-[#111111]">
            {selectedChat ? (
              <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={() => navigate(`/user/profile/${otherFriend.id}`)}
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="w-10 h-10 rounded-full object-cover mr-4"
                    src={
                      otherFriend?.avatar
                        ? otherFriend?.avatar
                        : "/user-profile2.jpg"
                    }
                    alt="User avatar"
                  />
                  {onlineUsersId.includes(String(currentChatUser)) && (
                    <h3 className="text-sm font-medium text-gray-800 transition-all duration-800 ease-in">
                      Online
                    </h3>
                  )}
                </div>
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
          <MessageContainer
            isMessageLoading={isMessageLoading}
            messages={messages}
          />

          {id ? (
            <form
              className="flex justify-center items-center absolute bottom-0 w-full gap-4 bg-white p-2"
              onSubmit={sendMessageHandler}
            >
              {/* Chat input */}
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text"
                placeholder="Type a message..."
              />
              <Button loading={isLoading}>Send</Button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Chats;
