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

    const { page } = req.query;

    const myFollowing = await prisma.follow.findMany({
      where: {
        followingId: myId,
      },
      select: {
        followingId: true,
        followerId: true,
      },
    });

    const followingIds = myFollowing.map((follow) => follow.followerId);

    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followingIds,
        },
      },
      include: {
        author: true,
        vote: true,
        savedPost: true,
      },
      skip: Number(page) * 5,
      take: Number(page) * 5 + 5,
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

export const getSinglePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
      vote: true,
      savedPost: true,
    },
  });

  responseReturn(res, 201, { post });
};

export const upOrDownVote: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const myId = req.user.id;

  const isVoted = await prisma.vote.findFirst({
    where: {
      post_id: parseInt(id),
      author_id: myId,
    },
  });

  if (isVoted) {
    await prisma.vote.delete({
      where: {
        id: isVoted?.id,
      },
    });
  }

  const vote = req.body?.vote;

  if (vote === "up-vote") {
    await prisma.vote.create({
      data: {
        author_id: myId,
        vote: vote,
        post_id: parseInt(id),
      },
    });
  } else if (vote === "down-vote") {
    await prisma.vote.create({
      data: {
        author_id: myId,
        vote: vote,
        post_id: parseInt(id),
      },
    });
  }

  const message = vote === "up-vote" ? "Upvoted" : "Devoted";

  responseReturn(res, 201, { message });
};

export const isVoted: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const myId = req.user.id;

  const isVoted = await prisma.vote.findFirst({
    where: {
      post_id: parseInt(id),
      author_id: myId,
    },
  });

  responseReturn(res, 201, { vote: isVoted });
};

export const myPosts: RequestHandler = async (req, res) => {
  const myId = req.user.id;

  const posts = await prisma.post.findMany({
    where: {
      authorId: myId,
    },
    include: {
      author: true,
      vote: true,
    },
  });

  responseReturn(res, 201, { posts });
};

export const toogleSavePost: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const { postId } = req.params;

  const isPostAlreadySaved = await prisma.savedPost.findFirst({
    where: {
      author_id: myId,
      post_id: parseInt(postId),
    },
  });

  if (isPostAlreadySaved) {
    await prisma.savedPost.delete({
      where: {
        id: isPostAlreadySaved.id,
      },
    });
    return responseReturn(res, 201, { message: "Post Is Removed From Saved" });
  } else {
    await prisma.savedPost.create({
      data: {
        author_id: myId,
        post_id: parseInt(postId),
      },
    });
  }

  const message = "Post Saved Successfully";

  responseReturn(res, 201, { message });
};
export const getSavedPost: RequestHandler = async (req, res) => {
  const myId = req.user.id;

  const posts = await prisma.savedPost.findMany({
    where: {
      author_id: myId,
    },
    include: {
      author: true,
      post: true,
    },
  });

  responseReturn(res, 201, { posts });
};

export const isPostSaved: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const { postId } = req.params;

  const post = await prisma.savedPost.findFirst({
    where: {
      author_id: myId,
      post_id: parseInt(postId),
    },
  });

  responseReturn(res, 201, { isSaved: post ? true : false });
};
