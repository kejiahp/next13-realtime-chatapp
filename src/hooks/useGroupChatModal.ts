import { create } from "zustand";

type IStore = {
  isOpen: boolean;
};

type Actions = {
  onOpen: () => void;
  onClose: () => void;
};

export const useGroupChatModal = create<IStore & Actions>()((set) => ({
  isOpen: false,
  onOpen: () =>
    set(() => ({
      isOpen: true,
    })),
  onClose: () =>
    set(() => ({
      isOpen: false,
    })),
}));
