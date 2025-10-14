"use client";
import { PropsWithChildren, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../AuthProvider";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { userId } = useAuth();
  useEffect(() => {
    if (!userId) {
      redirect("/login");
    }
  }, [userId]);

  return children;
}
