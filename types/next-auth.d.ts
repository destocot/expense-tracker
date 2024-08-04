import type { JWT as DefaultJWT } from "next-auth/jwt";
import type { User as DefaultUser } from "next-auth";
import type { User } from "@prisma/client";

declare module "next-auth" {
  interface User extends DefaultUser {
    userId: User["userId"];
    username: User["username"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: User["userId"];
    username: User["username"];
  }
}
