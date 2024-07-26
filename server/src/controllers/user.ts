import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const messages = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  responseReturn(res, 201, messages);
};

export const getRecommendedUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the most chatted user by the logged-in user
    const mostChattedUser = await prisma.chat.findFirst({
      where: {
        senderId: userId,
      },
      orderBy: {
        messages: {
          _count: "desc",
        },
      },
      select: {
        friends: true,
      },
    });

    if (!mostChattedUser || mostChattedUser.friends.length === 0) {
      return res.status(404).json({ message: "No most chatted user found" });
    }

    const mostChattedUserId = mostChattedUser.friends[0].id;

    // Get all users that the most chatted user has chatted with
    const chatsOfMostChattedUser = await prisma.chat.findMany({
      where: {
        friends: {
          some: {
            id: mostChattedUserId,
          },
        },
      },
      include: {
        friends: true,
      },
    });

    const usersChattedWithMostChattedUser = chatsOfMostChattedUser.flatMap(
      (chat) => chat.friends
    );

    // Remove duplicates (if any) and the most chatted user themselves
    const uniqueUsers = usersChattedWithMostChattedUser
      .filter((user) => user.id !== mostChattedUserId)
      .filter(
        (user, index, self) => index === self.findIndex((u) => u.id === user.id)
      );

    return res.status(200).json(uniqueUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
