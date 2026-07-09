"use client";
import { useActionState } from "react";
import { login } from "./actions";
export function LoginForm() {
  const [error, action, pending] = useActionState(login, undefined);
  return <form action={action} className="grid gap-4">
    <label>Email<input name="email" type="email" autoComplete="email" required /></label>
    <label>Parolă<input name="password" type="password" autoComplete="current-password" required /></label>
    {error && <p className="text-sm text-red-700">{error}</p>}
    <button className="btn btn-primary" disabled={pending}>{pending ? "Se conectează…" : "Intră în cont"}</button>
  </form>;
}
