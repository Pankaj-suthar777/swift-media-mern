import { Comment } from "./comment";
import { User } from "./user";

export interface ReplyToComment {
  id: number;
  created_at: Date;
  text: string;
  comment_id: number;
  author_id: number;
  author: User;
  comment: Comment;
}
