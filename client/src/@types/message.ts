import { IChat } from "./chat";
import { User } from "./user";

export interface IMessage {
  id: number;
  chatId: number;
  chat: IChat;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  senderId: number;
  sender: User;
}
