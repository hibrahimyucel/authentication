"use client";
import { createContext, useContext, useEffect, useState } from "react";

type AuthProviderContextValue = {
  user: string | null;
  setUser: (user: string | null) => void;
  token: unknown;
  setToken: (token: unknown) => void;
};

const AuthProviderContext = createContext<AuthProviderContextValue | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<unknown>();

  async function handleAuthState() {
    fetch("/api/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setToken(data.accessToken);
        } else {
          setUser(null);
          setToken(null);
        }
      });
  }

  useEffect(() => {
    handleAuthState();
  }, [user]);

  return (
    <AuthProviderContext
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {user}
      {children}
    </AuthProviderContext>
  );
}

export function useAuth() {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error("useAuth,  <AuthProvider> içinde kullanılabilir.!");
  }
  return context;
}
