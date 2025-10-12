"use client";
import { PropsWithChildren, useEffect } from "react";
import { redirect } from "next/navigation";
import { usemyContext } from "./auth-provider";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { id } = usemyContext();

  useEffect(() => {
    if (!id) {
      redirect("/login");
    }
  }, [id]);

  return children;
}
