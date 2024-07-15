import { useAppSelector } from "@/store/hooks";
import { Loader, UsersRound } from "lucide-react";
import { useEffect, useRef } from "react";
import moment from "moment";

interface Props {
  isMessageLoading: boolean;
  messages: any[];
}

const MessageContainer = ({ isMessageLoading, messages }: Props) => {
  const lastMessageRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const { userInfo } = useAppSelector((state) => state.auth);

  const myId = userInfo.id;
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto mb-20 px-2 mt-3">
          {/* Chat messages */}
          {isMessageLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader className="ml-2 h-12 w-12 animate-spin" />
            </div>
          ) : messages ? (
            messages.map((message: any, i: number) => {
              const senderId = message.senderId;

              const isMyMessage = senderId === myId;
              return (
                <div key={i} ref={lastMessageRef}>
                  <div className="flex flex-col mb-1 py-1">
                    {!isMyMessage && (
                      <div className="flex flex-col gap-1 items-start">
                        <div className="bg-white rounded-[10px]  px-8 py-2 max-w-[80%] relative">
                          <p className="text-gray-900 text-sm">
                            {message.text}
                          </p>
                        </div>
                        <span className="text-xs">
                          {moment(message?.created_at).format("LT")}
                        </span>
                      </div>
                    )}

                    {isMyMessage && (
                      <div className="flex items-end flex-col gap-1">
                        <div className="bg-blue-500 rounded-[10px] px-4 py-2 max-w-[80%] ">
                          <p className="text-white text-sm">{message.text}</p>
                        </div>
                        <span className="text-xs">
                          {moment(message?.created_at).format("LT")}
                        </span>
                      </div>
                    )}
                  </div>
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
      </div>
    </div>
  );
};

export default MessageContainer;
