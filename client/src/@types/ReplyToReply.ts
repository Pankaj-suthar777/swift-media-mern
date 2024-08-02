import { User } from "./user";

export interface ReplayToReplayComment {
  id: number;
  created_at: Date;
  text: string;
  replay_to: number;
  replay_to_author: User;
  author_id: number;
  author: User;
  replay_to_comment_id: number;
  replay_to_comment: ReplayToReplayComment;
}
