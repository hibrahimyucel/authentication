import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Geçersiz e-posta" }).trim(),
  password: z
    .string()
    .min(3, { message: "Şifre en az 3 karakter olmalı" })
    .trim(),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Kullanıcı adı en az 3 karakter olmalı" }),
    email: z.email({ message: "Geçersiz e-posta" }).trim(),
    password: z
      .string()
      .min(3, { message: "Şifre en az 3 karakter olmalı" })
      .trim(),
    password1: z
      .string()
      .min(3, { message: "Şifre en az 3 karakter olmalı" })
      .trim(),
  })
  .refine((data) => data.password === data.password1, {
    message: "Şifre eşleşmiyor.",
    path: ["password1"],
  });
