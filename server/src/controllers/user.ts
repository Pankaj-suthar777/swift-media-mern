import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const followersCount = await prisma.follow.count({
    where: {
      followerId: parseInt(id),
    },
  });

  const followingCount = await prisma.follow.count({
    where: {
      followingId: parseInt(id),
    },
  });

  const mUser: any = user;
  mUser.followersCount = followersCount;
  mUser.followingCount = followingCount;

  responseReturn(res, 201, {
    user: mUser,
  });
};

export const getRecommendedUser: RequestHandler = async (req, res) => {
  try {
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
            id: true,
          },
        },
      },
    });

    const chatUserIds = chats.flatMap((chat) =>
      chat.friends.map((friend) => friend.id)
    );

    const excludeUserIds = [...chatUserIds, myId];

    const users = await prisma.user.findMany({
      where: {
        id: {
          notIn: excludeUserIds,
        },
      },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        about: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const followUser: RequestHandler = async (req, res) => {
  const { id } = req.params as any;
  const myId = req.user.id;

  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: parseInt(id),
        followingId: parseInt(myId),
      },
    },
  });

  if (existingFollow) {
    await prisma.follow.delete({
      where: {
        id: existingFollow.id,
      },
    });
  } else {
    await prisma.follow.create({
      data: {
        follower: {
          connect: { id: parseInt(id) },
        },
        following: {
          connect: { id: parseInt(myId) },
        },
      },
    });
  }

  responseReturn(res, 201, { success: true });
};

export const isFollow: RequestHandler = async (req, res) => {
  const { id } = req.params as any;
  const myId = req.user.id;

  const follow = await prisma.follow.findFirst({
    where: {
      followerId: parseInt(id),
      followingId: myId,
    },
  });

  responseReturn(res, 201, follow ? true : false);
};
