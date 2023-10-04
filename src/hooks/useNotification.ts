import { Message } from "@/components/chat/types";
import { create } from "zustand";

type Store = {
  notifyMessage: Message[];
};
type Action = {
  setNotifyMessage: (message: Message) => void;
};

export const useNotification = create<Store & Action>((set) => ({
  notifyMessage: [],
  setNotifyMessage: (message) =>
    set((state) => ({
      notifyMessage: [...state.notifyMessage, message],
    })),
}));
