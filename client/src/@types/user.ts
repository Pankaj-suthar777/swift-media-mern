import { Chat } from "./chat";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  followings: number;
  followers: number;
  avatar?: string;
  about?: string;
  createdAt: Date;
  updatedAt: Date;
  friends: Chat[];
  followersCount?: number;
  followingCount?: number;
}
