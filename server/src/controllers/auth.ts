import bcrypt from "bcrypt";

import { responseReturn } from "#/utils/response";
import prisma from "#/prisma/prisma";
import { createToken } from "#/utils/createToken";
import { RequestHandler } from "express";

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
    });

    responseReturn(res, 201, { message: "User Register Success", token });
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
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = await createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: "user",
      });

      responseReturn(res, 201, {
        message: "User Login Success",
        token,
        userInfo: {
          id: user.id,
          email: user.email,
          role: "user",
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
  const { id } = req.user;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  responseReturn(res, 200, { userInfo: user });
};

// End Method

export const admin_login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    const match = password === user.password;
    if (match) {
      const token = await createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: "admin",
      });

      responseReturn(res, 201, {
        message: "User Login Success",
        token,
        userInfo: {
          id: user.id,
          email: user.email,
          role: "admin",
        },
      });
    } else {
      responseReturn(res, 404, { error: "Password Wrong" });
    }
  } else {
    responseReturn(res, 404, { error: "Email Not Found" });
  }
};
