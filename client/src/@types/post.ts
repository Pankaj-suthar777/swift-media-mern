import { User } from "./user";

export interface Post {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
  image?: string;
  author: User;
  vote: Vote[];
  savedPost: SavedPost[];
}

export interface Vote {
  id: number;
  created_at: Date;
  vote: "up-vote" | "down-vote";
  post_id: number;
  author_id: number;
}

export interface SavedPost {
  author_id: number;
  id: number;
  created_at: string;
  post_id: number;
}
