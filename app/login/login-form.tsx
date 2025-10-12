"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form
      action={loginAction}
      className="border-buttoncolor flex max-w-[300px] flex-col content-center gap-2 rounded-md border p-2"
    >
      <div className="grid grid-cols-3">
        Kullanıcı
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="bg-editbox focus:bg-editboxfocus col-span-2 w-full rounded-sm p-0.5 pl-1 outline-0"
        />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}

      <div className="grid grid-cols-3">
        Şifre
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="bg-editbox focus:bg-editboxfocus col-span-2 rounded-sm p-0.5 pl-1 outline-0"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
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
      Login
    </button>
  );
}
