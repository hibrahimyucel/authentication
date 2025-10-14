"use client";
import { createContext, use, useEffect, useState } from "react";

type AuthProviderContextValue = {
  isAuthenticated: boolean;
  userId: string | null;
  handleSignIn: (userId: string) => void;
  handleSignOut: () => void;
};

const AuthProviderContext = createContext<AuthProviderContextValue | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  console.log("AuthProvider");
  async function handleAuthState() {
    fetch("/api/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((d) => {
        if (d) {
          setIsAuthenticated(true);
          setUserId(d);
        } else {
          setIsAuthenticated(false);
          setUserId(null);
        }
      });
  }

  useEffect(() => {
    handleAuthState();
  }, [userId]);

  function handleSignIn(userId: string) {
    setIsAuthenticated(true);
    setUserId(userId);
  }

  function handleSignOut() {
    console.log("handleSignOut()");
    setIsAuthenticated(false);
    setUserId(null);
  }

  return (
    <AuthProviderContext
      value={{ isAuthenticated, userId, handleSignIn, handleSignOut }}
    >
      {userId}
      {children}
    </AuthProviderContext>
  );
}

export function useAuth() {
  const context = use(AuthProviderContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
