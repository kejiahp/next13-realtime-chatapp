import { number, string } from "zod";

export type SearchUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  cloudinaryPublicId: string;
  profilePhoto: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserChats = {
  _id: string;
  chatName: string;
  latestMessage: {
    _id: string;
    sender: {
      _id: string;
      username: string;
      email: string;
      profilePhoto: string;
    };
    content: string;
    chat: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  isGroupChat: boolean;
  users: Omit<SearchUser, "password">[];
  groupAdmin: Omit<SearchUser, "password">[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Message = {
  _id: string;
  sender: {
    _id: string;
    username: string;
    email: string;
    profilePhoto: string;
  };
  content: string;
  chat: {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: string[];
    groupAdmin: string[];
    createdAt: string;
    updatedAt: string;
    __v: 0;
    latestMessage: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};
