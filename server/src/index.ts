import express from "express";
import "dotenv/config";
import "express-async-errors";

import authRouter from "./routes/auth.route";
import chatRouter from "./routes/chat.route";
import userRouter from "./routes/user.route";

import { errorHandler } from "./middleware/error";

import { app, server } from "./socket/socket";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Port is listing on port " + PORT);
});
