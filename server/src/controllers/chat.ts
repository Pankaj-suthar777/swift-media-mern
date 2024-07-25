import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";
import { getReceiverSocketId, io } from "#/socket/socket";

// export const searchUser: RequestHandler = async (req, res) => {
//   const myId = req.user.id;
//   const searchValue = req.query.search;

//   if (
//     !searchValue ||
//     Array.isArray(searchValue) ||
//     typeof searchValue !== "string"
//   ) {
//     return res.status(400).json({ error: "A valid search query is required" });
//   }

//   // Get the list of user IDs that are already in the user's chats
//   const myChats = await prisma.chat.findMany({
//     where: {
//       OR: [{ friends: { some: { id: myId } } }, { senderId: myId }],
//     },
//     select: {
//       friends: {
//         select: {
//           id: true,
//         },
//       },
//       senderId: true,
//     },
//   });

//   const excludedUserIds = new Set<number>();
//   myChats.forEach((chat) => {
//     chat.friends.forEach((friend) => {
//       excludedUserIds.add(friend.id);
//     });
//     excludedUserIds.add(chat.senderId);
//   });

//   // Find users excluding those already in chats
//   const users = await prisma.user.findMany({
//     where: {
//       id: {
//         notIn: Array.from(excludedUserIds),
//         not: myId,
//       },
//       name: {
//         contains: searchValue,
//         mode: "insensitive",
//       },
//     },
//     take: 10,
//     select: {
//       id: true,
//       name: true,
//       email: true,
//     },
//   });

//   res.status(200).json(users);
// };

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
      avatar: true,
      about: true,
    },
  });

  responseReturn(res, 201, users);
};

export const sendMessage: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const receiverId = req.body?.receiverId;
  const message = req.body.message;

  const existingChat = await prisma.chat.findFirst({
    where: {
      AND: [
        {
          friends: {
            some: {
              id: parseInt(myId),
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
    newMessage = await prisma.message.create({
      data: {
        text: message,
        chat_id: newChat.id,
        senderId: myId,
      },
    });
  } else {
    newMessage = await prisma.message.create({
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

  // SOCKET IO FUNCTIONALITY WILL GO HERE
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    // io.to(<socket_id>).emit() used to send events to specific client
    io.to(receiverSocketId).emit("newMessage", newMessage);
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
          avatar: true,
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
