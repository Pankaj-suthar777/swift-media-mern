import express from "express";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";

import authRouter from "./routes/auth.route";
import chatRouter from "./routes/chat.route";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import groupChatRouter from "./routes/groupChat.route";
import adminRouter from "./routes/admin.route";

import session from "express-session";

import { errorHandler } from "./middleware/error";

import { app, server } from "./socket/socket";

app.set("trust proxy", 1);

import { CLIENT_URL, PORT, GOOGLE_SESSION_SECRET } from "./utils/variables";
import prisma from "./prisma/prisma";
const passport = require("passport");
require("./providers/google")(passport);
require("./providers/github")(passport);

// app.use(
//   session({
//     secret: GOOGLE_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // Initialize Passport middleware
// app.use(passport.initialize());
// app.use(
//   passport.session({
//     secret: GOOGLE_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true },
//   })
// );

app.use(
  session({
    secret: GOOGLE_SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Avoid race conditions
    cookie: {
      secure: true, // Required for HTTPS
      sameSite: "none", // Needed for cross-site cookies (OAuth)
      maxAge: 24 * 60 * 60 * 1000, // Optional: session expiry
    },
  })
);
app.use(passport.initialize());

// Remove options from passport.session():
app.use(passport.session()); 

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
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json("Hello World");
});

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/group-chat", groupChatRouter);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

const PORT_IN_USE = PORT || 5000;

server.listen(PORT_IN_USE, () => {
  console.log("Server is listing on port " + PORT_IN_USE);
});
