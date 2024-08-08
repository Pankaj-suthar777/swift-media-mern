import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import { convertDaysToDate } from "#/utils/helper";

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

  const totalPosts = await prisma.post.count({
    where: {
      authorId: parseInt(id),
    },
  });

  responseReturn(res, 201, {
    user: mUser,
    totalPosts,
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

export const serachUser: RequestHandler = async (req, res) => {
  const myId = req.user.id;
  const searchValue = req.query.search as string;

  if (searchValue === "") {
    responseReturn(res, 201, []);
  }

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: searchValue,
        mode: "insensitive",
      },
      id: {
        not: myId,
      },
    },
    select: {
      avatar: true,
      email: true,
      id: true,
      name: true,
    },
  });

  responseReturn(res, 201, users);
};

export const getUserPosts: RequestHandler = async (req, res) => {
  const { page } = req.query;
  const { userId } = req.params;

  const posts = await prisma.post.findMany({
    where: {
      authorId: parseInt(userId),
    },
    include: {
      author: true,
      savedPost: true,
      vote: true,
    },
    skip: Number(page) * 4,
    take: Number(page) * 4 + 4,
  });

  responseReturn(res, 201, { posts });
};

export const getDashboardData: RequestHandler = async (req, res) => {
  const { id } = req.user;

  const followCount = await prisma.follow.count({
    where: {
      followingId: parseInt(id),
    },
  });

  const followingCount = await prisma.follow.count({
    where: {
      followerId: parseInt(id),
    },
  });

  const postsCount = await prisma.post.count({
    where: {
      authorId: parseInt(id),
    },
  });

  const commentsCount = await prisma.comment.count({
    where: {
      author_id: parseInt(id),
    },
  });

  const commentReplayCount = await prisma.replayToComment.count({
    where: {
      author_id: parseInt(id),
    },
  });

  const replayedCommentReplayCount = await prisma.replayToReplayComment.count({
    where: {
      author_id: parseInt(id),
    },
  });

  const totalCommentsCount =
    commentsCount + commentReplayCount + replayedCommentReplayCount;

  const chatMessagesCount = await prisma.message.count({
    where: {
      senderId: parseInt(id),
    },
  });

  const groupChatMessagesCount = await prisma.message.count({
    where: {
      senderId: parseInt(id),
    },
  });

  const messageCount = chatMessagesCount + groupChatMessagesCount;

  const postUpvotesCount = await prisma.vote.count({
    where: {
      author_id: parseInt(id),
      vote: "up-vote",
    },
  });

  const postDisvotesConnt = await prisma.vote.count({
    where: {
      author_id: parseInt(id),
      vote: "down-vote",
    },
  });

  const chatsYouPartOf = await prisma.chat.count({
    where: {
      friends: {
        some: {
          id: parseInt(id),
        },
      },
    },
  });

  const GroupChatsYouPartOf = await prisma.groupChat.count({
    where: {
      friends: {
        some: {
          id: parseInt(id),
        },
      },
    },
  });

  const recentFollowersArray = await prisma.follow.findMany({
    where: {
      followingId: parseInt(id),
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      follower: true,
    },
    take: 4,
  });

  const recentFollowers = recentFollowersArray.map((recent) => recent.follower);
  responseReturn(res, 201, {
    followCount,
    followingCount,
    postsCount,
    totalCommentsCount,
    messageCount,
    postUpvotesCount,
    postDisvotesConnt,
    GroupChatsYouPartOf,
    chatsYouPartOf,
    recentFollowers,
  });
};

export const getDashboardMessageSentData: RequestHandler = async (req, res) => {
  const { id } = req.user;
  const now = new Date();
  const start = startOfMonth(now);
  const end = now; // today date

  const data = await prisma.message.findMany({
    where: {
      senderId: parseInt(id),
      created_at: {
        gte: start,
        lte: end,
      },
    },
    select: {
      created_at: true,
    },
  });

  // Process the posts to count messages per day
  const messageCountByDate = data.reduce((acc, post) => {
    const date = post.created_at.toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = 1;
    } else {
      acc[date]++;
    }
    return acc;
  }, {});

  // Generate all dates from the start of the month to today
  const allDates = eachDayOfInterval({ start, end }).map((date) =>
    format(date, "yyyy-MM-dd")
  );

  // Merge the dates with message counts
  const result = allDates.map((date) => ({
    date,
    count: messageCountByDate[date] || 0,
  }));

  responseReturn(res, 201, { data: result });
};

export const getDashboardPostActivityData: RequestHandler = async (
  req,
  res
) => {
  const { id } = req.user;
  const now = new Date();
  let start = startOfMonth(now);
  const end = now;

  const { duration } = req.query;

  if (duration) {
    start = convertDaysToDate(duration as string);
  }

  const data = await prisma.vote.findMany({
    where: {
      author_id: parseInt(id),
      created_at: {
        gte: start,
        lte: end,
      },
    },
    select: {
      created_at: true,
      vote: true,
    },
  });

  // Process the votes to count disvotes and upvotes per day
  const voteCountByDate = data.reduce((acc, vote) => {
    const date = vote.created_at.toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = { upvote: 0, disvote: 0 };
    }
    if (vote.vote === "up-vote") {
      acc[date].upvote++;
    } else if (vote.vote === "down-vote") {
      acc[date].disvote++;
    }
    return acc;
  }, {});

  // Generate all dates from the start of the month to today
  const allDates = eachDayOfInterval({ start, end }).map((date) =>
    format(date, "yyyy-MM-dd")
  );

  const result = allDates.map((date) => ({
    date,
    upvote: voteCountByDate[date]?.upvote || 0,
    disvote: voteCountByDate[date]?.disvote || 0,
  }));

  responseReturn(res, 201, { data: result });
};

export const getUserFollowersList: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const myId = req.user.id;

  if (myId === parseInt(id)) {
    const followers = await prisma.user.findUnique({
      where: {
        id: myId,
      },
      include: {
        followers: {
          include: {
            following: true,
          },
        },
      },
    });

    const sortedData = followers?.followers?.map((f) => f.following);

    return responseReturn(res, 201, {
      followers: sortedData || [],
    });
  }

  const followers = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      followers: {
        include: {
          following: true,
        },
      },
    },
  });

  const sortedData = followers?.followers?.map((f) => f.following);

  responseReturn(res, 201, { followers: sortedData || [] });
};

export const getUserFollowingList: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const myId = req.user.id;

  if (myId === parseInt(id)) {
    const following = await prisma.user.findUnique({
      where: {
        id: myId,
      },
      include: {
        following: {
          include: {
            follower: true,
          },
        },
      },
    });

    const sortedData = following?.following?.map((f) => f.follower);

    return responseReturn(res, 201, { following: sortedData || [] });
  }

  const following = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      following: {
        include: {
          follower: true,
        },
      },
    },
  });

  const sortedData = following?.following?.map((f) => f.follower);

  return responseReturn(res, 201, { following: sortedData || [] });
};
