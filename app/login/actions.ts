"use server";
import { success, z } from "zod";
import { signInSchema, signUpSchema } from "@/lib/auth/scheme";
import { createSession, deleteSession } from "../../lib/auth/session";
import { revalidatePath } from "next/cache";
import { hashSync, genSaltSync, compareSync } from "bcrypt-ts";
import { signUpDB } from "@/lib/db/mssqlquery";
const testUser = {
  id: "1",
  email: "c@c.io",
  password: "123",
};

export async function signUp(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = signUpSchema.safeParse(data);

  console.log(data);
  if (!result.success) {
    return {
      data: data,
      errors: z.treeifyError(result.error), //.flatten().fieldErrors,
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
  const result = signInSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);
  return { success: true, user: testUser.id };
}

export async function logout() {
  await deleteSession();
  return;
}
