"use client";

import { usemyContext } from "@/lib/auth/auth-provider";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";

export default function Login() {
  const { id } = usemyContext();
  if (id) redirect("/");
  return (
    <div className="flex w-full flex-col">
      <h1 className="bg-background border-diffcolor flex w-full border pl-1 font-bold">
        Giriş yap / Kayıt ol
      </h1>
      <div className="flex w-full justify-center p-1">
        <LoginForm />
      </div>
    </div>
  );
}
