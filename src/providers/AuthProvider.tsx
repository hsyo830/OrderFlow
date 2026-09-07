"use client";

import { ReactNode, useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const supabase = createClient();

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
    };

    getSession();
  }, [setUser]);

  return children;
};

export default AuthProvider;
