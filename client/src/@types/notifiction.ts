import { User } from "./user";

export interface Notification {
  id: number;
  message: string;
  created_at: string;
  user_id: number;
  author: User;
  user: User[];
  isSeen: boolean;
  image: string;
}
