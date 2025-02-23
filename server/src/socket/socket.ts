import { Server } from "socket.io";
import http from "http";
import express from "express";
import { CLIENT_URL } from "#/utils/variables";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [CLIENT_URL],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId: any) => {
  return userSocketMap[receiverId];
};

export const getReceiverSocketIds = (receiverIds: number[]) => {
  const socket_users_ids: any[] = [];
  for (const property in userSocketMap) {
    for (let i = 0; i <= receiverIds.length; i++) {
      const id = receiverIds[i];
      if (userSocketMap[property] === id) {
        socket_users_ids.push(userSocketMap[property]);
      }
    }
  }

  return socket_users_ids;
};

const userSocketMap = {} as any; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId as string;

  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
