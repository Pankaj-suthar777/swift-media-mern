import { Post } from "./post";
import { ReplyToComment } from "./replayToComment";
import { User } from "./user";
import { CommentVote } from "./vote";

export interface Comment {
  id: number;
  created_at: string;
  text: string;
  post_id: number;
  author_id: number;
  author: User;
  post: Post;
  replayedComment: ReplyToComment[];
  vote: CommentVote[];
}
