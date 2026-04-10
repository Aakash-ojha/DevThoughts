import { create } from "zustand";

interface PostStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const usePostStore = create<PostStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
