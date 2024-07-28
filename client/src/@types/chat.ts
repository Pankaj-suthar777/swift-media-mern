import { Message } from "./message";
import { User } from "./user";

export interface Chat {
  id: number;
  friends: User[];
  messages: Message[];
  lastMessage: string;
  senderId: number;
  sender: User;
  createdAt: Date;
  updatedAt: Date;
}
