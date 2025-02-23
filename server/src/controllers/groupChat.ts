import prisma from "#/prisma/prisma";
import { getReceiverSocketIds, io } from "#/socket/socket";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";
import { User } from "#/@types/user";

export const createGroupChat: RequestHandler = async (req, res) => {
  const {id :myId} = req.user as User;

  const { users, title, avatar } = req.body;

  if (!Array.isArray(users)) {
    return responseReturn(res, 400, {
      error: "Users must be an array of user IDs",
    });
  }

  users.push({ id: myId });

  await prisma.groupChat.create({
    data: {
      lastMessage: `chat created by ${(req.user as User).name}`,
      createdBy: myId,
      title: title,
      avatar: avatar,
      friends: {
        connect: users.map((user) => ({ id: user.id })),
      },
    },
    include: {
      friends: true,
    },
  });

  responseReturn(res, 201, { message: "Group is created successfully" });
};

export const getUserGroupChats: RequestHandler = async (req, res) => {
  const {id :myId} = req.user as User;

  const chats = await prisma.groupChat.findMany({
    where: {
      friends: {
        some: {
          id: myId,
        },
      },
    },
    select: {
      friends: {
        select: {
          name: true,
          id: true,
          avatar: true,
        },
      },
      lastMessage: true,
      id: true,
      createdBy: true,
      title: true,
      avatar: true,
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  responseReturn(res, 201, chats);
};

export const sendGroupMessage: RequestHandler = async (req, res) => {
  const {id :myId} = req.user as User;
  const { chatId } = req.params;
  const message = req.body.message;

  const existingChat = await prisma.groupChat.findUnique({
    where: {
      id: parseInt(chatId),
    },
    include: {
      friends: true,
    },
  });

  let newMessage;

  if (!existingChat) {
    return responseReturn(res, 401, { error: "chat not found!" });
  }

  newMessage = await prisma.groupMessage.create({
    data: {
      text: message,
      group_chat_id: existingChat.id,
      senderId: myId,
    },
  });

  await prisma.groupChat.update({
    where: {
      id: existingChat.id,
    },
    data: {
      lastMessage: message,
    },
  });

  newMessage.senderId = myId;
  newMessage.sender = req.user as User;
  const friends = existingChat.friends.map((friend) => friend.id);
  // SOCKET IO FUNCTIONALITY WILL GO HERE
  const receiverSocketId = getReceiverSocketIds(friends);
  if (receiverSocketId) {
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  responseReturn(res, 201, { message: "Message send successfully" });
};

export const getGroupChatMessage: RequestHandler = async (req, res) => {
  const { chatId } = req.params;

  const messages = await prisma.groupMessage.findMany({
    where: {
      group_chat_id: parseInt(chatId),
    },
    include: {
      sender: true,
    },
  });

  responseReturn(res, 201, messages);
};

export const getGroupChatInfo: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const chatInfo = await prisma.groupChat.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      friends: true,
    },
  });

  responseReturn(res, 201, { chatInfo });
};

export const updateGroupChat: RequestHandler = async (req, res) => {
  const {id :myId} = req.user as User;
  const { id } = req.params;

  const { users, title, avatar } = req.body;

  if (users.length < 2) {
    return responseReturn(res, 400, {
      error: "To create group total people must be at least 3",
    });
  }

  users.push({ id: myId });

  await prisma.groupChat.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: title,
      avatar: avatar,
      friends: {
        set: users.map((user) => ({ id: user.id })),
      },
    },
  });

  responseReturn(res, 201, { message: "Group is updated successfully" });
};
