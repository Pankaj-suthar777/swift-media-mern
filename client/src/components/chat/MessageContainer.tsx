import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import { Loader, UsersRound } from "lucide-react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Message } from "@/@types/message";
import { GroupMessage } from "@/@types/groupChat";
import { RootState } from "@/store/store";

interface Props {
  isMessageLoading: boolean;
  messages: Message[] | GroupMessage[] | any[];
  isGroupMessages?: boolean;
}

const MessageContainer = ({
  isMessageLoading,
  messages,
  isGroupMessages = false,
}: Props) => {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const myId = userInfo?.id;
  const { id } = useParams();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!id) {
    return (
      <div className="flex justify-center h-full items-center flex-col gap-4">
        <span>
          <UsersRound size={35} />
        </span>
        <span>Select a user to chat</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden h-full">
      <div className="flex flex-col h-full">
        <div className="overflow-y-auto px-2 mt-3">
          {/* Chat messages */}
          {isMessageLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader className="ml-2 h-12 w-12 animate-spin" />
            </div>
          ) : messages ? (
            <>
              {messages.map((message, i: number) => {
                const senderId = message.senderId;
                const previousMessage = messages[i - 1];
                const nextMessage = messages[i + 1];
                const isSentInSameTime =
                  moment(message?.created_at).format("LT") !==
                  moment(nextMessage?.created_at).format("LT");

                const isMyMessage = senderId === myId;
                console.log(message?.imageUrl);
                return (
                  <div key={i}>
                    <div className="flex flex-col py-1">
                      {!isMyMessage && (
                        <div className="flex flex-col gap-1 items-start">
                          {isGroupMessages &&
                          previousMessage &&
                          previousMessage.senderId !== senderId ? (
                            <span className="text-xs py-1 bg-slate-50 px-2 rounded-xl">
                              send by : {message.sender?.name}
                            </span>
                          ) : null}

                          <div className="bg-white rounded-[10px] px-8 py-2 max-w-[80%] md:max-w-[40vw] relative word-wrap">
                            {message?.imageUrl ? (
                              <div className="w-[300px] h-[300px]">
                                <img
                                  className="h-full w-full object-contain"
                                  src={message.imageUrl}
                                  alt="image"
                                />
                              </div>
                            ) : null}
                            <p className="text-gray-900 text-sm break-words">
                              {message.text}
                            </p>
                          </div>

                          {isSentInSameTime && (
                            <span className="text-xs mb-2">
                              {moment(message?.created_at).format("LT")}
                            </span>
                          )}
                        </div>
                      )}

                      {isMyMessage && (
                        <div className="flex items-end flex-col gap-1">
                          <div className="bg-blue-500 rounded-[10px] px-4 py-2 max-w-[80vw] md:max-w-[40vw] word-wrap">
                            {message?.imageUrl ? (
                              <div className="w-[300px] h-[300px] mb-2">
                                <img
                                  className="h-full w-full object-contain"
                                  src={message.imageUrl}
                                  alt="image"
                                />
                              </div>
                            ) : null}
                            <p className="text-white text-sm break-words">
                              {message.text}
                            </p>
                          </div>
                          <span className="text-xs">
                            {isSentInSameTime &&
                              moment(message?.created_at).format("LT")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {/* <div ref={messagesEndRef} /> */}
            </>
          ) : (
            <div className="flex justify-center h-full items-center flex-col gap-4">
              <span>
                <UsersRound size={35} />
              </span>
              <span>Select a user to chat</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
