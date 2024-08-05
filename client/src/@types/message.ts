import { Chat } from "./chat";
import { User } from "./user";

export interface Message {
  id: number;
  chatId: number;
  chat: Chat;
  text: string;
  created_at?: Date;
  updated_at?: Date;
  senderId: number;
  sender: User;
}
