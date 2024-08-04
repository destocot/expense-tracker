import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as v from "valibot";
import argon2 from "argon2";
import { SigninSchema } from "@/validators/signin.validator";
import { findOneUserByUsername } from "@/resources/users.resource";
import { authConfig } from "@/auth.config";

const { providers: authConfigProviders, ...authConfigRest } = authConfig;

const nextAuth = NextAuth({
  ...authConfigRest,
  providers: [
    ...authConfigProviders,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = v.safeParse(SigninSchema, credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.output;

          const user = await findOneUserByUsername(username);
          if (!user) return null;

          const passwordsMatch = await argon2.verify(user.password, password);

          if (passwordsMatch) {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }

        return null;
      },
    }),
  ],
});

export const { signIn, signOut, auth, handlers } = nextAuth;
