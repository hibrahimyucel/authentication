"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "./actions";
import { useAuth } from "@/lib/AuthProvider";
import { redirect } from "next/navigation";

export function SignInForm() {
  const [state, signInAction] = useActionState(signIn, undefined);
  const { userId, handleSignIn } = useAuth();

  useEffect(() => {
    if (state?.success) handleSignIn(state?.user);
  }, [state]);
  return (
    <form
      action={signInAction}
      className="border-buttoncolor flex max-w-[300px] flex-col content-center gap-2 rounded-md border p-2"
    >
      <button type="button">{userId}</button>
      <div className="grid grid-cols-3">
        e-Posta
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="bg-editbox focus:bg-editboxfocus col-span-2 w-full rounded-sm p-0.5 pl-1 outline-0"
        />
        {state?.errors?.email && (
          <p className="text-red-500">{state?.errors?.email}</p>
        )}
      </div>
      <div className="grid grid-cols-3">
        Şifre
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="bg-editbox focus:bg-editboxfocus col-span-2 rounded-sm p-0.5 pl-1 outline-0"
        />
        {state?.errors?.password && (
          <p className="text-red-500">{state?.errors?.password}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-buttoncolor rounded-md p-2"
    >
      Giriş
    </button>
  );
}
