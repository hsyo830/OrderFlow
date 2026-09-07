import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setIsInitialized: (isInitialized: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),
}));
