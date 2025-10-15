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
      className="border-buttoncolor flex w-[300px] max-w-[300px] flex-col rounded-md border p-1 text-nowrap"
    >
      <p className="pt-1"> e-Posta</p>
      <input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        defaultValue={state?.data?.email.toString()}
        className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-1 outline-0"
      />
      {state?.errors?.properties?.email && (
        <p className="text-red-500">
          {state?.errors?.properties?.email.errors}
        </p>
      )}
      <p className="pt-1">Şifre</p>

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        defaultValue={state?.data?.password.toString()}
        className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-1 outline-0"
      />
      {state?.errors?.properties?.password && (
        <p className="text-red-500">
          {state?.errors?.properties?.password.errors}
        </p>
      )}
      {state?.errorpassword && (
        <p className="text-red-500">{state?.errorpassword}</p>
      )}
      <p className="p-2"></p>
      <button
        disabled={isPending}
        type="submit"
        className="bg-buttoncolor border-diffcolor hover:bg-editbox cursor-pointer rounded-md border p-2"
      >
        Giriş
      </button>
    </form>
  );
}
