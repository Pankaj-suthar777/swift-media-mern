import { Chat } from "./chat";
import { User } from "./user";

export interface Message {
  id: number;
  chatId: number;
  chat: Chat;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  senderId: number;
  sender: User;
}
