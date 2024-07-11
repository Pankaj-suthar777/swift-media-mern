import express from "express";
import "dotenv/config";
import "express-async-errors";

import authRouter from "./routes/auth.route";
import chatRouter from "./routes/chat.route";

import { errorHandler } from "./middleware/error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Port is listing on port " + PORT);
});
