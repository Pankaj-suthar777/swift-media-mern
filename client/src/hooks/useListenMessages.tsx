// import React, { useEffect } from "react";
// import { useSocketContext } from "../context/SocketContext";

// const useListenMessage = () => {
//   const { socket } = useSocketContext();
//   const { messages, setMessages } = useConversation();

//   useEffect(() => {
//     socket?.on("newMessage", (newMessage: any) => {
//       newMessage.shouldShake = true;
//       setMessages([...messages, newMessage]);
//     });

//     return () => socket?.off("newMessage");
//   }, [socket, setMessages, messages]);
// };

// export default useListenMessage;
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

const useListenMessage = ({}) => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessage;
