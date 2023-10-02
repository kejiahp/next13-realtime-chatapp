import { UserChats } from "@/components/chat/types";
import { create } from "zustand";

type Store = {
  chat: UserChats | null;
};

type Action = {
  setChat: (chat: UserChats | null) => void;
};

export const useSelectedChat = create<Store & Action>((set) => ({
  chat: null,
  setChat: (data) => set(() => ({ chat: data })),
}));
