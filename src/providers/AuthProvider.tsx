"use client";
import { useAuth } from "@/hooks/useAuth";
import { createContext, useContext } from "react";

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Missing AuthProvider.");
  return context;
}
