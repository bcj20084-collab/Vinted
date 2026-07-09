"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
export async function login(_: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) return "Email sau parolă incorectă.";
    throw error;
  }
}
