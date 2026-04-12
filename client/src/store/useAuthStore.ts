import { getMe } from "@/api/authApi";
import { create } from "zustand";

export interface User {
  _id: string;
  name: string;
  username?: string;
  email: string;
  phoneNo?: string;
  profilePicture: string;
  bio: string;
  skills: string[];
  github: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
  setAuth: (user: User) => void;
  logoutUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  checkAuth: async () => {
    try {
      const response = await getMe();
      // console.log("Full API Response:", response.data);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      // console.error("Auth check failed:", error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setAuth: (user) => set({ user, isAuthenticated: true, isLoading: false }),

  logoutUser: () =>
    set({ user: null, isAuthenticated: false, isLoading: false }),
}));
