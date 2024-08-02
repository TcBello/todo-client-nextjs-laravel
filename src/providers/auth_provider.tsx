"use client";

import { getToken } from "@/data/local/token_data_local_storage";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  /**
   * Handles the redirection to the home page when a token exists
   * for persistence login
   */
  useEffect(() => {
    if (token != null) {
      router.replace("/home");
    }
  }, [token]);

  /**
   * Handles the setting a token from the local storage
   */
  useEffect(() => {
    if (token == null) {
      setToken(getToken());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
