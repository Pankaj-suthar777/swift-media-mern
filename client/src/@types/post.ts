import { User } from "./user";

export interface Post {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
  image?: string;
  author: User;
  upvote: number;
  disvote: number;
}
