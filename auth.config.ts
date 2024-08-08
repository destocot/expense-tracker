import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/auth/signin" },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;

      const isLoggedIn = !!auth?.user;
      const isOnAuth = nextUrl.pathname.startsWith("/auth");

      if (isOnAuth) {
        if (!isLoggedIn) return true;
        return Response.redirect(new URL("/", nextUrl));
      }

      return !!isLoggedIn;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.userId;
        token.username = user.username;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
