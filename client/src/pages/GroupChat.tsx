import { GroupChat as IGroupChat, GroupMessage } from "@/@types/groupChat";

import MessageContainer from "@/components/chat/MessageContainer";
import { Button } from "@/components/custom/button";
import GroupChatList from "@/components/group-chat/GroupChatList";
import { Input } from "@/components/ui/input";
import { useSocketContext } from "@/context/SocketContext";

import {
  useGetGroupChatByIdQuery,
  useGetGroupChatMessagesQuery,
  useSendGroupMessageMutation,
} from "@/store/api/groupChatApi";
import { Menu } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GroupChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //const { userInfo } = useAppSelector((state) => state.auth);

  const [showSidebar, setShowSidebar] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<GroupMessage[]>([]);

  const [sendMessage, { isLoading }] = useSendGroupMessageMutation();

  const { data: chatData } = useGetGroupChatByIdQuery(id);

  const {
    data: messageData,
    isLoading: isMessageLoading,
    refetch: refetchMessages,
  } = useGetGroupChatMessagesQuery({ chatId: id }, { skip: !id });

  useEffect(() => {
    if (id) {
      refetchMessages();
    }
  }, [id, refetchMessages]);

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

  const sendMessageHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!message || !id) {
      return;
    }

    sendMessage({ body: { message }, id });

    // setMessages([
    //   ...messages,
    //   {
    //     text: message,
    //     created_at: new Date(Date.now()),
    //     group_chat_id: parseInt(id),
    //     // @ts-expect-error not going to be null fix type in userInfo
    //     senderId: userInfo.id,
    //   },
    // ]);

    setMessage("");
  };
  const chatInfo: IGroupChat = chatData?.chatInfo;

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
        <GroupChatList />
      </div>
      <div className="w-full relative">
        <div className="flex flex-col h-viewport-minus-100px w-full overflow-y-hidden">
          <div className="h-12 bg-white flex justify-between items-center px-4 py-8 border border-[#111111]">
            {chatInfo && (
              <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={() => navigate(`/user/group-chat-info/${chatInfo.id}`)}
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="w-10 h-10 rounded-full object-cover mr-4"
                    src={
                      chatInfo?.avatar ? chatInfo?.avatar : "/user-profile2.jpg"
                    }
                    alt="avatar"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  {chatInfo?.title}
                </h3>
              </div>
            )}

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
            isGroupMessages={true}
          />

          {id ? (
            <form
              className="flex justify-center items-center absolute bottom-5 sm:bottom-0 w-full gap-4 bg-white p-2"
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

export default GroupChat;
