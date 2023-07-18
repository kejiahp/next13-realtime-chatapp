import { create } from "zustand";

type IUseLoginStore = {
  isOpen: boolean;
};

type Actions = {
  onOpen: () => void;
  onClose: () => void;
};

export const useLogin = create<IUseLoginStore & Actions>()((set) => ({
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
