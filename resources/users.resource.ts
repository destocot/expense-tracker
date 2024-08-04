import "server-only";

import prisma from "@/lib/db";
import { User, Prisma } from "@prisma/client";

type FindOneUserByUsernameOptions = {
  withSecurityQuestion?: boolean;
};

type UserWithSecurityQuestion = Prisma.UserGetPayload<{
  include: { security_question: true };
}>;

export function findOneUserByUsername(
  username: User["username"]
): Promise<User | null>;

export function findOneUserByUsername(
  username: User["username"],
  options: { withSecurityQuestion: true }
): Promise<UserWithSecurityQuestion | null>;

export async function findOneUserByUsername(
  username: User["username"],
  options?: FindOneUserByUsernameOptions
): Promise<User | UserWithSecurityQuestion | null> {
  const withSecurityQuestion = options?.withSecurityQuestion ?? false;

  if (withSecurityQuestion) {
    return await prisma.user.findUnique({
      where: { username },
      include: { security_question: true },
    });
  }

  return await prisma.user.findUnique({ where: { username } });
}
