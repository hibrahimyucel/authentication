"use client";
import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn } from "../actions/actions";
import { useAuth } from "../context/authProvider";

export function SignInForm() {
  const [state, signInAction, isPending] = useActionState(signIn, undefined);
  const { user, setUser } = useAuth();
  if (user) redirect("/dashboard");
  useEffect(() => {
    if (state?.success) {
      setUser(state?.user);
      redirect("/");
    }
  }, [state]);
  return (
    <form
      action={signInAction}
      className="border-buttoncolor flex max-w-[300px] flex-col content-center gap-1 rounded-md border p-2"
    >
      e-Posta
      <input
        id="email"
        name="email"
        placeholder="Email"
        defaultValue={state?.data?.email.toString()}
        className="bg-editbox focus:bg-editboxfocus w-full rounded-sm p-0.5 pl-1 outline-0"
      />
      {state?.errors?.properties?.email && (
        <p className="text-red-500">
          {state?.errors?.properties?.email.errors}
        </p>
      )}
      Şifre
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        defaultValue={state?.data?.password.toString()}
        className="bg-editbox focus:bg-editboxfocus w-full rounded-sm p-0.5 pl-1 outline-0"
      />
      {state?.errors?.properties?.password && (
        <p className="text-red-500">
          {state?.errors?.properties?.password.errors}
        </p>
      )}
      {state?.errorpassword && (
        <p className="text-red-500">{state?.errorpassword}</p>
      )}
      <button
        disabled={isPending}
        type="submit"
        className="bg-buttoncolor rounded-md p-2"
      >
        Giriş
      </button>
    </form>
  );
}
