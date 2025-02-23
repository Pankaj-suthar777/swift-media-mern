export interface UserDocument {
  id: String;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  favorites: string[];
  followers: string[];
  followings: string[];
  github?: string;
  twitter?: string;
}
export type User = {
  id: number;
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

// declare global {
//   namespace Express {
//     interface Request {
//       user: User;
//       token: string;
//     }
//   }
// }
