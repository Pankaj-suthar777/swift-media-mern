import { Comment } from "./comment";
import { User } from "./user";
import { ReplayToReplyCommentVote } from "./vote";

export interface ReplayToReplayComment {
  id: number;
  created_at: Date;
  text: string;
  replay_to: number;
  replay_to_author: User;
  author_id: number;
  author: User;
  replay_to_comment_id: number;
  replay_to_comment: Comment;
  replayToReplyCommentVote: ReplayToReplyCommentVote[];
}
