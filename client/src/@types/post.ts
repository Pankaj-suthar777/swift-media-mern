import { User } from "./user";
import { VoteType } from "./vote";

export interface Post {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
  image?: string;
  author: User;
  vote: Vote[];
  savedPost: SavedPost[];
  visibility: "ONLY_FOLLOWING" | "PUBLIC";
}

export interface Vote {
  id: number;
  created_at: Date;
  vote: VoteType;
  post_id: number;
  author_id: number;
}

export interface SavedPost {
  author_id: number;
  id: number;
  created_at: string;
  post_id: number;
}
