import express from "express";
import "dotenv/config";
import "express-async-errors";
import "./db";
import "./utils/schedule";

import authRouter from "./routes/auth.route";
import { errorHandler } from "./middleware/error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8989;

app.listen(PORT, () => {
  console.log("Port is listing on port " + PORT);
});
