"use client";
import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import { forgotPassword } from "../actions/actions";

export function ForgotPasswordForm() {
  const [state, forgotPasswordAction, isPending] = useActionState(
    forgotPassword,
    undefined,
  );

  useEffect(() => {
    if (state?.success) {
      alert("Şifreniz e-posta hesabınıza gönderildi.");
      redirect("/login");
    }
  }, [state]);
  return (
    <form
      action={forgotPasswordAction}
      className="border-buttoncolor flex w-[300px] max-w-[300px] flex-col gap-1 rounded-md border p-1 text-nowrap"
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
      Onay kodu
      <input
        id="emailverify"
        name="emailverify"
        placeholder={"Adresinize gönderilen onay kodu"}
        maxLength={6}
        defaultValue={state?.data?.emailverify?.toString()}
        className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-0.5 pl-1 outline-0"
      />
      {state?.errors?.properties?.emailverify && (
        <p className="text-red-500">
          {state?.errors?.properties?.emailverify.errors}
        </p>
      )}
      {state?.error && <p className="text-red-500">{state?.error}</p>}
      <button
        disabled={isPending}
        type="submit"
        className="bg-buttoncolor border-diffcolor hover:bg-editbox cursor-pointer rounded-md border p-2"
      >
        Şifre Gönder
      </button>
    </form>
  );
}
