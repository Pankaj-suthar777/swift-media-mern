import { Comment } from "./comment";
import { ReplayToReplayComment } from "./ReplyToReply";
import { User } from "./user";
import { ReplayToCommentVote } from "./vote";

export interface ReplyToComment {
  id: number;
  created_at: Date;
  text: string;
  comment_id: number;
  author_id: number;
  author: User;
  comment: Comment;
  replies: ReplayToReplayComment[];
  vote: ReplayToCommentVote[];
}
