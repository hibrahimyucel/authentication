"use server";
import { success, z } from "zod";
import { signInSchema, signUpSchema } from "@/lib/auth/scheme";
import { createSession, deleteSession } from "../../lib/auth/session";
import { revalidatePath } from "next/cache";
import { hashSync, genSaltSync, compareSync } from "bcrypt-ts";
import { signInDB, signUpDB } from "@/lib/db/mssqlquery";

export async function signUp(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = signUpSchema.safeParse(data);

  console.log(data);
  if (!result.success) {
    return {
      data: data,
      errors: z.treeifyError(result.error),
    };
  }
  const d = {
    username: result.data.username,
    email: result.data.email,
    password: hashSync(result.data.password),
  };
  try {
    const s = await signUpDB(d);
    return {
      data: data,
      success: true,
    };
  } catch (error) {
    const e = (error as Error).message;
    if (e.includes("PK_auth_user"))
      return {
        data: data,
        error: "Bu e-mail daha önce kaydedilmiş.!",
      };
    else
      return {
        data: data,
        error: (error as Error).message,
      };
  }
}
export async function signIn(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    return {
      data: data,
      errors: z.treeifyError(result.error),
    };
  }
  let user: string = "";
  const { email, password } = result.data;
  const d = await signInDB({ username: "", email, password });
  d.map((item) => {
    if (compareSync(password, item.password)) user = item.fk_user;
  });

  if (!user)
    return {
      data: data,
      errorpassword: ["Geçersiz kullanıcı adı veya şifre.!"],
    };
  await createSession(user);

  return { success: true, user };
}

export async function logout() {
  await deleteSession();
  return;
}
