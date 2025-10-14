"use client";
import { useState } from "react";
import { SignInForm } from "@/authentication/components/signIn";
import { SignUpForm } from "@/authentication/components/signUp";

export default function Login() {
  const [newUser, setNewUser] = useState<boolean>(false);
  return (
    <div className="flex w-full justify-center gap-1">
      <div className="flex flex-col pt-1">
        <div className="flex">{newUser ? <SignUpForm /> : <SignInForm />}</div>
        <div className="border-buttoncolor grid grid-cols-2 rounded-md border p-1">
          <button
            type="button"
            className={`bg-buttoncolor col-start-${newUser ? "2" : "1"} w-full rounded-md p-2`}
            onClick={() => setNewUser(!newUser)}
          >
            {newUser ? "Giriş yap" : "Kayıt ol"}
          </button>
        </div>
      </div>
    </div>
  );
}
