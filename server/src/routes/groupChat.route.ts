import {
  getGroupChatMessage,
  getUserGroupChats,
  sendGroupMessage,
  createGroupChat,
  getGroupChatInfo,
  updateGroupChat,
} from "#/controllers/groupChat";
import { authMiddleware } from "#/middleware/authMiddleware";
import { validate } from "#/middleware/validator";
import { CreateGroupSchema, UpdateGroupSchema } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post("/send-group-message/:chatId", authMiddleware, sendGroupMessage);
router.get("/get-my-group-chats", authMiddleware, getUserGroupChats);
router.post(
  "/create-group",
  validate(CreateGroupSchema),
  authMiddleware,
  createGroupChat
);
router.put(
  "/update-group/:id",
  validate(UpdateGroupSchema),
  authMiddleware,
  updateGroupChat
);
router.get(
  "/get-group-chat-messages/:chatId",
  authMiddleware,
  getGroupChatMessage
);
router.get("/get-group-chat/:id", authMiddleware, getGroupChatInfo);
export default router;
