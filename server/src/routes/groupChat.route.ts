import {
  //   getGroupChatMessage,
  getUserGroupChats,
  //   sendGroupMessage,
  createGroupChat,
} from "#/controllers/groupChat";
import { authMiddleware } from "#/middleware/authMiddleware";
import { validate } from "#/middleware/validator";
import { CreateGroupSchema } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

// router.post("/send-group-message", authMiddleware, sendMessage);
router.get("/get-my-group-chats", authMiddleware, getUserGroupChats);
router.post(
  "/create-group",
  validate(CreateGroupSchema),
  authMiddleware,
  createGroupChat
);
// router.get("/get-group-chat-messages/:chatId", authMiddleware, getChatMessage);

export default router;
