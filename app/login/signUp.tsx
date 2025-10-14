"use client";
import { useActionState, useEffect, useState } from "react";
import { signUp } from "./actions";
import { redirect } from "next/navigation";

export function SignUpForm() {
  const inf = {
    UserName: "Kullanıcı adınız",
    eMail: "e-Posta adresiniz",
    Password: "Şifre belirleyin",
    PasswordAgain: "Şifrenizi onaylayın",
  };

  const [state, signUpAction, isPending] = useActionState(signUp, undefined);

  useEffect(() => {
    if (state?.success) {
      alert("Kayıt işlemi tamamlandı.");
      redirect("/login");
    }
  }, [state]);
  return (
    <>
      <form
        action={signUpAction}
        className="border-buttoncolor flex max-w-[300px] flex-col gap-1 rounded-md border text-nowrap"
      >
        <div className="flex flex-col p-1">
          <p className="font-bold">{inf.UserName}</p>
          <input
            id="username"
            name="username"
            placeholder={inf.UserName}
            defaultValue={state?.data?.username?.toString()}
            className="bg-editbox focus:bg-editboxfocus w-full rounded-sm p-0.5 pl-1 outline-0"
          />
          {state?.errors?.properties?.username && (
            <p className="grid text-red-500">
              {state?.errors?.properties.username?.errors.toString()}
            </p>
          )}
          <p className="grid pt-1 font-bold">{inf.eMail}</p>
          <input
            id="email"
            name="email"
            placeholder={inf.eMail}
            defaultValue={state?.data?.email?.toString()}
            className="bg-editbox focus:bg-editboxfocus w-full rounded-sm p-0.5 pl-1 outline-0"
          />
          {state?.errors?.properties?.email && (
            <p className="text-red-500">
              {state?.errors?.properties?.email.errors.toString()}
            </p>
          )}
          <p className="pt-1 font-bold">{inf.Password}</p>
          <input
            id="password"
            name="password"
            type="password"
            placeholder={inf.Password}
            defaultValue={state?.data?.password?.toString()}
            className="bg-editbox focus:bg-editboxfocus w-full rounded-sm p-0.5 pl-1 outline-0"
          />
          {state?.errors?.properties?.password && (
            <p className="text-red-500">
              {state?.errors?.properties?.password?.errors.toString()}
            </p>
          )}
          <p className="pt-1 font-bold">{inf.PasswordAgain}</p>
          <input
            id="password1"
            name="password1"
            type="password"
            placeholder={inf.PasswordAgain}
            defaultValue={state?.data?.password1?.toString()}
            className="bg-editbox focus:bg-editboxfocus w-full rounded-sm p-0.5 pl-1 outline-0"
          />
          {state?.errors?.properties?.password1 && (
            <p className="text-red-500">
              {state?.errors?.properties?.password1?.errors.toString()}
            </p>
          )}
        </div>
        {state?.error && <p className="text-red-500">{state?.error}</p>}
        <button
          disabled={isPending}
          type="submit"
          className="bg-buttoncolor rounded-md p-2"
        >
          Kayıt
        </button>
      </form>
    </>
  );
}
