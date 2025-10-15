"use client";
import { useActionState, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { signUp } from "../actions/actions";

export function SignUpForm() {
  const inf = {
    UserName: "Kullanıcı adınız",
    eMail: "e-Posta adresiniz",
    eMailVerify: "Adresinize gönderilen onay kodu",
    Password: "Şifre belirleyin",
    Password1: "Şifrenizi onaylayın",
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
        className="border-buttoncolor flex w-[300px] max-w-[300px] flex-col rounded-md border p-1 text-nowrap"
      >
        <p className="pt-1">{inf.UserName}</p>
        <input
          id="username"
          name="username"
          placeholder={inf.UserName}
          defaultValue={state?.data?.username?.toString()}
          className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-1 outline-0"
        />
        {state?.errors?.properties?.username && (
          <p className="text-red-500">
            {state?.errors?.properties.username?.errors.toString()}
          </p>
        )}
        <p className="pt-1">{inf.eMail}</p>
        <input
          id="email"
          name="email"
          placeholder={inf.eMail}
          defaultValue={state?.data?.email.toString()}
          className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-1 outline-0"
        />
        {state?.errors?.properties?.email && (
          <p className="text-red-500">
            {state?.errors?.properties?.email.errors.toString()}
          </p>
        )}

        <p className="pt-1">{inf.Password}</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder={inf.Password}
          defaultValue={state?.data?.password?.toString()}
          className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-1 outline-0"
        />
        {state?.errors?.properties?.password && (
          <p className="text-red-500">
            {state?.errors?.properties?.password?.errors.toString()}
          </p>
        )}
        <p className="pt-1">{inf.Password1}</p>
        <input
          id="password1"
          name="password1"
          type="password"
          placeholder={inf.Password1}
          defaultValue={state?.data?.password1?.toString()}
          className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-1 outline-0"
        />
        {state?.errors?.properties?.password1 && (
          <p className="text-red-500">
            {state?.errors?.properties?.password1?.errors.toString()}
          </p>
        )}
        <p className="p-2"></p>
        {state?.error && <p className="text-red-500">{state?.error}</p>}
        <button
          disabled={isPending}
          type="submit"
          className="bg-buttoncolor border-diffcolor hover:bg-editbox cursor-pointer rounded-md border p-2"
        >
          Kayıt
        </button>
        <p className="pt-1"></p>
        <input
          id="emailverify"
          name="emailverify"
          placeholder={inf.eMailVerify}
          maxLength={6}
          defaultValue={state?.data?.emailverify?.toString()}
          className="bg-editbox border-buttoncolor focus:bg-editboxfocus w-full rounded-sm border p-1 outline-0"
        />
        {state?.errors?.properties?.emailverify && (
          <p className="text-red-500">
            {state?.errors?.properties?.emailverify?.errors}
          </p>
        )}
      </form>
    </>
  );
}
