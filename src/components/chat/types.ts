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
    sender: string;
    content: string;
    chat: string;
  };
  isGroupChat: boolean;
  users: Omit<SearchUser, "password">[];
  groupAdmin: Omit<SearchUser, "password">[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
