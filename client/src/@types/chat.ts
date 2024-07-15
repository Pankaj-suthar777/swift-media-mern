import { IMessage } from "./message";
import { User } from "./user";

export interface IChat {
  id: number;
  friends: User[];
  messages: IMessage[];
  lastMessage: string;
  senderId: number;
  sender: User;
  createdAt: Date;
  updatedAt: Date;
}
