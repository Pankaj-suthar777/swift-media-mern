import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";

export const createGroupChat: RequestHandler = async (req, res) => {
  const myId = req.user.id;

  const { users, title, avatar } = req.body;

  if (!Array.isArray(users)) {
    return responseReturn(res, 400, {
      error: "Users must be an array of user IDs",
    });
  }

  await prisma.groupChat.create({
    data: {
      lastMessage: `chat created by ${req.user.name}`,
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
  const myId = req.user.id;

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
    },
  });

  responseReturn(res, 201, chats);
};
