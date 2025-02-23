import prisma from "#/prisma/prisma";
import { responseReturn } from "#/utils/response";
import { RequestHandler } from "express";
import { subMonths, format } from "date-fns";
import { User } from "@prisma/client";
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

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.chat.deleteMany({
      where: { senderId: parseInt(id) },
    });
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return responseReturn(res, 200, {
      message: "user deleted successfully",
    });
  } catch (error: any) {
    responseReturn(res, 404, { error: error.message });
  }
};

export const changePassword: RequestHandler = async (req, res) => {
  const { id } = req.user as User as User;
  const { newPassword, oldPassword } = req.body;
  console.log("newPassword", newPassword);
  try {
    const admin = await prisma.adminUser.findFirst({ where: { id } });
    if (admin?.password === oldPassword) {
      await prisma.adminUser.update({
        where: { id },
        data: {
          password: newPassword,
        },
      });
      return responseReturn(res, 200, {
        message: "password updated successfully",
      });
    } else {
      return responseReturn(res, 200, {
        message: "old password is wrong",
      });
    }
  } catch (error: any) {
    responseReturn(res, 404, { error: error.message });
  }
};
