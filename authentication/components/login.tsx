"use client";
import { useState } from "react";
import { SignInForm } from "@/authentication/components/signIn";
import { SignUpForm } from "@/authentication/components/signUp";
import { useAuth } from "../context/authProvider";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "./forgotPassword";

export default function LoginForm() {
  const [newUser, setNewUser] = useState<number>(1);
  const { user } = useAuth();
  if (user) redirect("/dashboard");
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex">
          {newUser == 0 ? (
            <SignUpForm />
          ) : newUser == 1 ? (
            <SignInForm />
          ) : (
            <ForgotPasswordForm />
          )}
        </div>
        <div className="border-buttoncolor grid grid-cols-2 gap-1 rounded-md border p-1">
          <button
            type="button"
            className={`bg-buttoncolor ${newUser == 1 ? "hidden" : ""} border-diffcolor hover:bg-editbox cursor-pointer rounded-md border p-2`}
            onClick={() => setNewUser(1)}
          >
            {"Giriş"}
          </button>
          <button
            type="button"
            className={`bg-buttoncolor ${newUser == 0 ? "hidden" : ""} border-diffcolor hover:bg-editbox cursor-pointer rounded-md border p-2`}
            onClick={() => setNewUser(0)}
          >
            {"Kayıt Ol"}
          </button>
          <button
            type="button"
            className={`bg-buttoncolor ${newUser == 2 ? "hidden" : ""} border-diffcolor hover:bg-editbox cursor-pointer rounded-md border p-2`}
            onClick={() => setNewUser(2)}
          >
            {"Şifremi unuttum!"}
          </button>
        </div>
      </div>
    </div>
  );
}
