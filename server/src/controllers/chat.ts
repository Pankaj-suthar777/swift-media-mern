import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";
import { getReceiverSocketId, io } from "#/socket/socket";
import { User } from "#/@types/user";

export const serachUser: RequestHandler = async (req, res) => {
  const {id : myId} = req.user as User;
  const searchValue = req.query.search;

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
          id: true,
        },
      },
    },
  });

  if (
    !searchValue ||
    Array.isArray(searchValue) ||
    typeof searchValue !== "string"
  ) {
    return res.status(400).json({ error: "A valid search query is required" });
  }

  const chatUserIds = chats.flatMap((chat) =>
    chat.friends.map((friend) => friend.id)
  );

  const excludeUserIds = [...chatUserIds, myId];

  const users = await prisma.user.findMany({
    where: {
      id: {
        notIn: excludeUserIds,
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
      avatar: true,
      about: true,
    },
  });

  responseReturn(res, 201, users);
};

export const sendMessage: RequestHandler = async (req, res) => {
  const {id : myId} = req.user as User;
  const receiverId = req.body?.receiverId;
  const message = req.body.message;
  const imageUrl = req.body.imageUrl;

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
              id: parseInt(receiverId),
            },
          },
        },
      ],
    },
  });

  let newMessage;
  let chat;

  if (!existingChat) {
    // new chat
    chat = await prisma.chat.create({
      data: {
        lastMessage: message,
        senderId: myId,
        friends: {
          connect: [{ id: myId }, { id: receiverId }],
        },
      },
      include: {
        friends: true,
      },
    });
    const ewMessage = await prisma.message.create({
      data: {
        text: message,
        chat_id: chat.id,
        senderId: myId,
        imageUrl,
      },
    });
  } else {
    newMessage = await prisma.message.create({
      data: {
        text: message,
        chat_id: existingChat.id,
        senderId: myId,
        imageUrl,
      },
    });
    chat = await prisma.chat.update({
      where: {
        id: existingChat.id,
      },
      data: {
        lastMessage: message,
      },
      include: {
        friends: true,
      },
    });
  }

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newChatNotification", {
      text: newMessage.text,
      senderInfo: req.user as User,
    });
  }

  responseReturn(res, 201, {
    message: "Message send successfully",
    chat: chat,
  });
};

export const getUserChats: RequestHandler = async (req, res) => {
  const {id : myId} = req.user as User;

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
          avatar: true,
        },
      },
      lastMessage: true,
      senderId: true,
      id: true,
    },
    orderBy: {
      updated_at: "desc",
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

export const getOtherUserChatWithMe: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const {id : myId} = req.user as User;

  const chat = await prisma.chat.findFirst({
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
              id: parseInt(userId),
            },
          },
        },
      ],
    },
  });

  responseReturn(res, 201, chat);
};
