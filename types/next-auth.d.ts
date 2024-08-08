import type { JWT as DefaultJWT } from "next-auth/jwt";
import type { User } from "@prisma/client";

declare module "next-auth" {
  interface User {
    userId: User["userId"];
    username: User["username"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: User["userId"];
    username: User["username"];
  }
}

export {};
