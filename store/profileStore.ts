import { create } from "zustand";

interface ProfileState {
  name: string;
  avatar: string;
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: "",
  avatar: "/avatars/avatar1.png",
  setName: (name) => set({ name }),
  setAvatar: (avatar) => set({ avatar }),
  resetProfile: () => set({ name: "", avatar: "/avatars/avatar1.png" }),
}));
