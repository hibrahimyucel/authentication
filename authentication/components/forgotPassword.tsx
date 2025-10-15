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
      className="border-buttoncolor flex w-[300px] max-w-[300px] flex-col rounded-md border p-1 text-nowrap"
    >
      <p className="pt-1">e-Posta</p>
      <input
        id="email"
        name="email"
        placeholder="Email"
        defaultValue={state?.data?.email.toString()}
        className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-1 outline-0"
      />
      {state?.errors?.properties?.email && (
        <p className="text-red-500">
          {state?.errors?.properties?.email.errors}
        </p>
      )}
      <p className="pt-1">Onay kodu</p>

      <input
        id="emailverify"
        name="emailverify"
        placeholder={"Adresinize gönderilen onay kodu"}
        maxLength={6}
        defaultValue={state?.data?.emailverify?.toString()}
        className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-1 outline-0"
      />
      {state?.errors?.properties?.emailverify && (
        <p className="text-red-500">
          {state?.errors?.properties?.emailverify.errors}
        </p>
      )}
      {state?.error && <p className="text-red-500">{state?.error}</p>}
      <p className="p-2"></p>
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
