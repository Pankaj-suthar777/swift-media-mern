import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";

export const serachUser: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const searchValue = req.query.search;

  if (
    !searchValue ||
    Array.isArray(searchValue) ||
    typeof searchValue !== "string"
  ) {
    return res.status(400).json({ error: "A valid search query is required" });
  }

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: myId,
      },
      name: {
        contains: searchValue,
        mode: "insensitive",
      },
    },
    take: 10,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  responseReturn(res, 201, users);
};

export const sendMessage: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const receiverId = req.body.receiverId;
  const message = req.body.message;

  const existingChat = await prisma.chat.findFirst({
    where: {
      AND: [
        {
          friends: {
            some: {
              id: myId,
            },
          },
        },
        {
          friends: {
            some: {
              id: receiverId,
            },
          },
        },
      ],
    },
  });

  if (!existingChat) {
    const newChat = await prisma.chat.create({
      data: {
        lastMessage: message,
        senderId: myId,
        friends: {
          connect: [{ id: myId }, { id: receiverId }],
        },
      },
    });
    await prisma.message.create({
      data: {
        text: message,
        chat_id: newChat.id,
        senderId: myId,
      },
    });
  } else {
    await prisma.message.create({
      data: {
        text: message,
        chat_id: existingChat.id,
        senderId: myId,
      },
    });
    await prisma.chat.update({
      where: {
        id: existingChat.id,
      },
      data: {
        lastMessage: message,
      },
    });
  }

  responseReturn(res, 201, { message: "Message send successfully" });
};

export const getUserChats: RequestHandler = async (req, res) => {
  const myId = req.user.id;

  const chats = await prisma.chat.findMany({
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
        },
      },
      lastMessage: true,
      senderId: true,
      id: true,
    },
  });

  responseReturn(res, 201, chats);
};

export const getChatMessage: RequestHandler = async (req, res) => {
  const { chatId } = req.params;

  const messages = await prisma.message.findMany({
    where: {
      chat_id: parseInt(chatId),
    },
  });

  responseReturn(res, 201, messages);
};
