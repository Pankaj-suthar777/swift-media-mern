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
    followingIds.push(myId);

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

  const { page } = req.query;

  const posts = await prisma.savedPost.findMany({
    where: {
      author_id: myId,
    },
    include: {
      author: true,
      post: {
        include: {
          vote: true,
          savedPost: true,
          author: true,
        },
      },
    },
    skip: Number(page) * 8,
    take: Number(page) * 8 + 8,
  });

  const mPost = posts.map((saved) => saved.post);

  responseReturn(res, 201, { posts: mPost });
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

export const addComment: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const { id } = req.params;
  const { text } = req.body;

  await prisma.comment.create({
    data: {
      author_id: myId,
      post_id: parseInt(id),
      text: text,
    },
  });

  responseReturn(res, 201, { message: "Comment added successfully" });
};

export const getPostComment: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const comments = await prisma.comment.findMany({
    where: {
      post_id: parseInt(id),
    },
    include: {
      author: true,
      post: true,
      vote: true,
      replayedComment: {
        include: {
          author: {
            select: {
              avatar: true,
              name: true,
              email: true,
            },
          },
          vote: true,

          replies: {
            include: {
              replay_to_author: {
                select: {
                  avatar: true,
                  name: true,
                  email: true,
                },
              },
              author: {
                select: {
                  avatar: true,
                  name: true,
                  email: true,
                },
              },
              replayToReplyCommentVote: true,
            },
          },
        },
      },
    },
  });

  responseReturn(res, 201, { comments });
};

export const addReplayComment: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const { id } = req.params;
  const { text } = req.body;

  await prisma.replayToComment.create({
    data: {
      author_id: myId,
      comment_id: parseInt(id),
      text: text,
    },
  });

  responseReturn(res, 201, { message: "Replay added to comment successfully" });
};

export const addReplayToReplayComment: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const { text, replayToAuthorId, replayToCommentId } = req.body;

  await prisma.replayToReplayComment.create({
    data: {
      author_id: myId,
      text: text,
      replay_to_author_id: parseInt(replayToAuthorId),
      replay_to_comment_id: parseInt(replayToCommentId),
    },
  });

  responseReturn(res, 201, { message: "Replay added to comment successfully" });
};

export const toogleCommentVote: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const { id } = req.params;

  const isVoted = await prisma.commentVote.findFirst({
    where: {
      comment_id: parseInt(id),
      author_id: myId,
    },
  });

  if (isVoted) {
    await prisma.commentVote.delete({
      where: {
        id: isVoted?.id,
      },
    });
  }

  const vote = req.body?.vote;

  if (vote === "up-vote") {
    await prisma.commentVote.create({
      data: {
        author_id: myId,
        vote: vote,
        comment_id: parseInt(id),
      },
    });
  } else if (vote === "down-vote") {
    await prisma.commentVote.create({
      data: {
        author_id: myId,
        vote: vote,
        comment_id: parseInt(id),
      },
    });
  }

  const message = vote === "up-vote" ? "Upvoted" : "Devoted";

  responseReturn(res, 201, { message });
};

export const toogleCommentReplayVote: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const { id } = req.params;

  const isVoted = await prisma.replayToCommentVote.findFirst({
    where: {
      reply_to_comment_id: parseInt(id),
      author_id: myId,
    },
  });

  if (isVoted) {
    await prisma.replayToCommentVote.delete({
      where: {
        id: isVoted?.id,
      },
    });
  }

  const vote = req.body?.vote;

  if (vote === "up-vote") {
    await prisma.replayToCommentVote.create({
      data: {
        author_id: myId,
        vote: vote,
        reply_to_comment_id: parseInt(id),
      },
    });
  } else if (vote === "down-vote") {
    await prisma.replayToCommentVote.create({
      data: {
        author_id: myId,
        vote: vote,
        reply_to_comment_id: parseInt(id),
      },
    });
  }

  const message = vote === "up-vote" ? "Upvoted" : "Devoted";

  responseReturn(res, 201, { message });
};
export const toogleReplayedCommentReplyVote: RequestHandler = async (
  req,
  res
) => {
  const myId = req.user.id;
  const { id } = req.params;

  const isVoted = await prisma.replayToReplyCommentVote.findFirst({
    where: {
      reply_to_reply_comment_id: parseInt(id),
      author_id: myId,
    },
  });

  if (isVoted) {
    await prisma.replayToReplyCommentVote.delete({
      where: {
        id: isVoted?.id,
      },
    });
  }

  const vote = req.body?.vote;

  if (vote === "up-vote") {
    await prisma.replayToReplyCommentVote.create({
      data: {
        author_id: myId,
        vote: vote,
        reply_to_reply_comment_id: parseInt(id),
      },
    });
  } else if (vote === "down-vote") {
    await prisma.replayToReplyCommentVote.create({
      data: {
        author_id: myId,
        vote: vote,
        reply_to_reply_comment_id: parseInt(id),
      },
    });
  }

  const message = vote === "up-vote" ? "Upvoted" : "Devoted";

  responseReturn(res, 201, { message });
};
