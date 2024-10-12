import express from "express";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
// import passport from "./config/passport";

import authRouter from "./routes/auth.route";
import chatRouter from "./routes/chat.route";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import groupChatRouter from "./routes/groupChat.route";
import session from "express-session";

import { errorHandler } from "./middleware/error";

import { app, server } from "./socket/socket";
import { CLIENT_URL, PORT, GOOGLE_SESSION_SECRET } from "./utils/variables";
import prisma from "./prisma/prisma";
const passport = require("passport");
require("./providers/google.ts")(passport);

app.use(
  session({
    secret: GOOGLE_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(
  passport.session({
    secret: GOOGLE_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// get user info
passport.deserializeUser(async function (id, done) {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    if (user) {
      done(null, user);
    } else {
      done(new Error("User not found"), null);
    }
  } catch (error) {
    done(error, null);
  }
});

app.use(
  cors({
    origin: "*",
    // origin:[CLIENT_URL],
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
