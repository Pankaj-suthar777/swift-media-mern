export interface UserDocument {
  id: String;
  name: string;
  email: string;
  password: string;
  avatar?: { url: string; publicId: string };
  favorites: string[];
  followers: string[];
  followings: string[];
  github?: string;
  twitter?: string;
}
export type User = {
  id: string; // Assuming 'id' should be string
  name: string;
  email: string;
  avatar?: string;
  followers: number;
  followings: number;
  role: string;
  about: string;
  backgroundImage: string;
};

import { Request } from "express";

export interface CreateUser extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
      token: string;
    }
  }
}
