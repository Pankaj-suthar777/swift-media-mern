import { User } from "./user";

export interface GroupChat {
  id: number;
  friends: User[];
  avatar?: string;
  title: string;
  messages: GroupMessage[];
  createdBy: number;
  lastMessage: string;
  created_at: Date;
  updated_at: Date;
}

export interface GroupMessage {
  id?: number;
  group_chat_id: number;
  group_chat?: GroupChat;
  text: string;
  created_at: Date;
  updated_at?: Date;
  senderId: number;
  sender?: User;
  type?: MessageType;
}

export enum MessageType {
  SYSTEM = "SYSTEM",
  NORMAL_MESSAGE = "NORMAL_MESSAGE",
}
