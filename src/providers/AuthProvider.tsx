"use client";

import { ReactNode, useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsInitialized = useAuthStore((state) => state.setIsInitialized);

  useEffect(() => {
    const supabase = createClient();

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setIsInitialized(true);
    };

    getSession();
  }, [setUser, setIsInitialized]);

  return children;
};

export default AuthProvider;
