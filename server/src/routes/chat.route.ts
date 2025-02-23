import {
  getChatMessage,
  getUserChats,
  sendMessage,
  serachUser,
  getOtherUserChatWithMe,
} from "#/controllers/chat";
import { authMiddleware } from "#/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.get("/search", authMiddleware, serachUser);
router.post("/send-message", authMiddleware, sendMessage);
router.get("/get-my-chats", authMiddleware, getUserChats);
router.get("/get-chat-messages/:chatId", authMiddleware, getChatMessage);
router.get(
  "/other-user-chat-with-me/:userId",
  authMiddleware,
  getOtherUserChatWithMe
);

export default router;
