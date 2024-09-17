import { Comment } from "./comment";
import { ReplyToComment } from "./replayToComment";
import { ReplayToReplayComment } from "./ReplyToReply";
import { User } from "./user";

export type VoteType = "up-vote" | "down-vote";

export interface CommentVote {
  id: number;
  created_at: Date;
  vote: VoteType;
  comment_id: number;
  author_id: number;
  author?: User;
  comment: Comment;
}

export interface ReplayToCommentVote {
  id: number;
  created_at: Date;
  vote: VoteType;
  reply_to_comment_id: number;
  author_id: number;
  author?: User;
  reply_to_comment: ReplyToComment;
}

export interface ReplayToReplyCommentVote {
  id: number;
  created_at: Date;
  vote: VoteType;
  reply_to_reply_comment_id: number;
  author_id: number;
  author?: User;
  reply_to_reply_comment: ReplayToReplayComment;
}
