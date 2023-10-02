import { create } from "zustand";

type StoreType = {
  isOpen: boolean;
};

type ActionsType = {
  onOpen: () => void;
  onClose: () => void;
};

export const useGroupChatModal = create<StoreType & ActionsType>()((set) => ({
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

type UpdateStoreType = {
  isOpen: boolean;
};
type UpdateActionType = {
  onOpen: () => void;
  onClose: () => void;
};

export const useUpdateGroupChat = create<UpdateStoreType & UpdateActionType>()(
  (set) => ({
    isOpen: false,
    onOpen: () =>
      set(() => ({
        isOpen: true,
      })),
    onClose: () =>
      set(() => ({
        isOpen: false,
      })),
  })
);
