import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";
import { subMonths, format } from "date-fns";
export const getDashboardData: RequestHandler = async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const postCount = await prisma.post.count();

    const startDate = subMonths(new Date(), 6);

    const usersRegisteredOnDates = await prisma.user.groupBy({
      by: ["created_at"],
      _count: {
        id: true,
      },
      where: {
        created_at: {
          gte: startDate,
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });

    const postRegisteredOnDates = await prisma.post.groupBy({
      by: ["created_at"],
      _count: {
        id: true,
      },
      where: {
        created_at: {
          gte: startDate,
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });

    const formattedPostRegistrations = postRegisteredOnDates.reduce(
      (acc, entry) => {
        const date = format(entry.created_at, "yyyy-MM-dd");
        const existingEntry = acc.find((item) => item.date === date);

        if (existingEntry) {
          existingEntry.registers += entry._count.id;
        } else {
          acc.push({ date, registers: entry._count.id });
        }

        return acc;
      },
      [] as { date: string; registers: number }[]
    );

    const formattedUserRegistrations = usersRegisteredOnDates.reduce(
      (acc, entry) => {
        const date = format(entry.created_at, "yyyy-MM-dd");
        const existingEntry = acc.find((item) => item.date === date);

        if (existingEntry) {
          existingEntry.registers += entry._count.id;
        } else {
          acc.push({ date, registers: entry._count.id });
        }

        return acc;
      },
      [] as { date: string; registers: number }[]
    );

    const dateMap: Record<string, { users: number; posts: number }> = {};

    formattedUserRegistrations.forEach(({ date, registers }) => {
      if (!dateMap[date]) {
        dateMap[date] = { users: 0, posts: 0 };
      }
      dateMap[date].users = registers;
    });

    formattedPostRegistrations.forEach(({ date, registers }) => {
      if (!dateMap[date]) {
        dateMap[date] = { users: 0, posts: 0 };
      }
      dateMap[date].posts = registers;
    });

    const finalData = Object.entries(dateMap).map(
      ([date, { users, posts }]) => ({
        date,
        users,
        posts,
      })
    );

    return responseReturn(res, 200, {
      userCount,
      postCount,
      chartData: finalData,
    });
  } catch (error: any) {
    responseReturn(res, 404, { error: error.message });
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        followers: {
          select: {
            id: true,
          },
        },
        following: {
          select: { id: true },
        },
        posts: {
          select: { id: true },
        },
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar || "",
      email: user.email,
      followersCount: user.followers.length,
      followingCount: user.following.length,
      posts: user.posts.length,
    }));

    return responseReturn(res, 200, {
      users: formattedUsers,
    });
  } catch (error: any) {
    responseReturn(res, 404, { error: error.message });
  }
};

export const popularUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        about: true,
        followers: {
          select: {
            id: true,
          },
        },
        following: {
          select: { id: true },
        },
        posts: {
          select: { id: true },
        },
      },
      orderBy: {
        followers: {
          _count: "desc",
        },
      },
      take: 10,
    });

    const formattedUsers = users.map((u) => {
      return {
        id: u.id,
        name: u.name,
        avatar: u.avatar,
        email: u.email,
        about: u.about,
        followersCount: u.followers.length,
        followingCount: u.following.length,
        posts: u.posts.length,
      };
    });

    return responseReturn(res, 200, {
      users: formattedUsers,
    });
  } catch (error: any) {
    responseReturn(res, 404, { error: error.message });
  }
};
