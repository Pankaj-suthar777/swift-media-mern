import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";

export const createPost: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const { text, image } = req.body;
  let post;

  if (image) {
    post = await prisma.post.create({
      data: {
        text: text,
        image: image,
        authorId: myId,
      },
    });
  } else {
    post = await prisma.post.create({
      data: {
        text: text,
        authorId: myId,
      },
    });
  }

  responseReturn(res, 201, { post, message: "Post is created successfully" });
};

export const getFeed: RequestHandler = async (req, res) => {
  try {
    const myId = req.user.id;

    const myFollowing = await prisma.follow.findMany({
      where: {
        followerId: myId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = myFollowing.map((follow) => follow.followingId);

    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followingIds,
        },
      },
      include: {
        author: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
