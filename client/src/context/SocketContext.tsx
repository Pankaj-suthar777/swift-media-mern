// import { useAppSelector } from "@/store/hooks";
// import React, { createContext, useState, useEffect, useContext } from "react";
// import io from "socket.io-client";

// const SocketContext = createContext({});

// // eslint-disable-next-line react-refresh/only-export-components
// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// export const SocketContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [socket, setSocket] = useState<any>(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { userInfo: authUser } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     if (authUser) {
//       const socket = io("http://localhost:5000", {
//         query: {
//           userId: authUser.id,
//         },
//       });

//       setSocket(socket);

//       // socket.on() is used to listen to the events. can be used both on client and server side
//       socket.on("getOnlineUsers", (users: any) => {
//         setOnlineUsers(users);
//       });

//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser, socket]);

//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
import { useAppSelector } from "@/store/hooks";
import React, { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: any[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { userInfo: authUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser.id,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users: any) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
