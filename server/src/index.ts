import express from "express";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";

import authRouter from "./routes/auth.route";
import chatRouter from "./routes/chat.route";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import groupChatRouter from "./routes/groupChat.route";

import { errorHandler } from "./middleware/error";

import { app, server } from "./socket/socket";
import { CLIENT_URL, PORT } from "./utils/variables";
// import { createClient } from "redis";

// const client = createClient({
//   socket: {
//     host: "127.0.0.1",
//     port: 6379,
//   },
// });

// client.connect().catch((err) => {
//   console.error("Error connecting to Redis:", err);
// });

// client.on("connect", () => {
//   console.log("Connected to Redis");
// });

// client.on("error", (err) => {
//   console.error("Redis error:", err);
// });

app.use(
  cors({
    origin: [CLIENT_URL],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/group-chat", groupChatRouter);

app.use(errorHandler);

const PORT_IN_USE = PORT || 5000;

server.listen(PORT_IN_USE, () => {
  console.log("Server is listing on port " + PORT_IN_USE);
});
