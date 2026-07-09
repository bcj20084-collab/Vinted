import type { NextAuthConfig } from "next-auth";
export default {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: { authorized: ({ auth }) => Boolean(auth) }
} satisfies NextAuthConfig;
