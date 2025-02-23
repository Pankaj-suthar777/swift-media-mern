import bcrypt from "bcrypt";

import { responseReturn } from "#/utils/response";
import prisma from "#/prisma/prisma";
import { createToken } from "#/utils/createToken";
import { RequestHandler } from "express";
import { User } from "@prisma/client";

// user register @POST /api/auth/register
export const user_register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    responseReturn(res, 404, { error: "Email Already Exits" });
  } else {
    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    });

    const token = await createToken({
      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
      role: "user",
      followersCount: 0,
      followingCount: 0,
      about: createUser.about,
      backgroundImage: createUser.backgroundImage,
    });

    responseReturn(res, 201, {
      message: "User Register Success",
      token,
      userInfo: {
        name: createUser.name,
        id: createUser.id,
        email: createUser.email,
        role: "user",
        followersCount: 0,
        followingCount: 0,
        about: createUser.about,
      },
    });
  }
};

// End Method
// user login @POST /api/auth/login

export const user_login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      friends: true,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const followersCount = await prisma.follow.count({
        where: {
          followerId: user.id,
        },
      });

      const followingCount = await prisma.follow.count({
        where: {
          followingId: user.id,
        },
      });

      const token = await createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: "user",
        followersCount,
        followingCount,
        about: user.about,
        avatar: user.avatar,
        backgroundImage: user.backgroundImage,
      });

      responseReturn(res, 201, {
        message: "User Login Success",
        token,
        userInfo: {
          name: user.name,
          id: user.id,
          email: user.email,
          role: "user",
          followersCount,
          followingCount,
          about: user.about,
          friends: user?.friends,
          avatar: user.avatar,
          backgroundImage: user?.backgroundImage,
        },
      });
    } else {
      responseReturn(res, 404, { error: "Password Wrong" });
    }
  } else {
    responseReturn(res, 404, { error: "Email Not Found" });
  }
};

// End Method
// get user info @GET /api/auth/get-user

export const get_user: RequestHandler = async (req, res) => {
  const { id } = req.user as User;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      friends: true,
    },
  });

  if (!user) {
    return responseReturn(res, 200, {
      error: "User not found",
    });
  }

  const followersCount = await prisma.follow.count({
    where: {
      followerId: user.id,
    },
  });

  const followingCount = await prisma.follow.count({
    where: {
      followingId: user.id,
    },
  });

  responseReturn(res, 200, {
    userInfo: {
      name: user.name,
      id: user.id,
      email: user.email,
      role: "user",
      followersCount,
      followingCount,
      about: user.about,
      avatar: user.avatar,
      github: user?.github || null,
      twitter: user?.twitter || null,
      friends: user?.friends,
      backgroundImage: user?.backgroundImage,
    },
  });
};

// End Method

export const admin_login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.adminUser.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    const match = password === user.password;
    if (match) {
      const token = await createToken({
        id: user.id,
        email: user.email,
        role: "admin",
        avatar: user.avatar,
      });

      responseReturn(res, 201, {
        message: "User Login Success",
        token,
        userInfo: {
          id: user.id,
          email: user.email,
          role: "admin",
          avatar: user.avatar,
        },
      });
    } else {
      responseReturn(res, 404, { error: "Password Wrong" });
    }
  } else {
    responseReturn(res, 404, { error: "Email Not Found" });
  }
};

export const update_user: RequestHandler = async (req, res) => {
  const { about, name, avatar, github, twitter, backgroundImage } = req.body;
  const {id} = req.user as User;

  try {
    const user = await prisma.user.update({
      data: {
        about: about,
        name: name,
        avatar: avatar,
        github,
        twitter,
        backgroundImage,
      },
      where: {
        id: id,
      },
    });

    if (!user) {
      return responseReturn(res, 404, {
        error: "User not found",
      });
    }
    return responseReturn(res, 200, {
      message: "User info updated",
      user,
    });
  } catch (error: any) {
    responseReturn(res, 404, { error: error.message });
  }
};

export const update_password: RequestHandler = async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const {id} = req.user as User;

  try {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      return responseReturn(res, 404, {
        error: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(oldPassword, user.password);

    if (isMatched) {
      await prisma.user.update({
        where: {
          id,
        },
        data: { password: await bcrypt.hash(newPassword, 10) },
      });
      return responseReturn(res, 200, {
        message: "password updated",
      });
    } else {
      return responseReturn(res, 200, {
        error: "Old password is wrong",
      });
    }
  } catch (error: any) {
    responseReturn(res, 404, { error: error.message });
  }
};

export const admin_get_user: RequestHandler = async (req, res) => {
  const { id } = req.user as User;

  const user = await prisma.adminUser.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return responseReturn(res, 200, {
      error: "User not found",
    });
  }

  responseReturn(res, 200, {
    userInfo: {
      avatar: user.avatar,
      id: user.id,
      email: user.email,
      role: "admin",
    },
  });
};
