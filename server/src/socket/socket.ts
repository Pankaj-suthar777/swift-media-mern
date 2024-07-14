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

const userSocketMap = {} as any; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId as string;

  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };