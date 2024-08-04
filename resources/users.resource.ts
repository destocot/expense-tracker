import "server-only";

import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function findOneUserByUsername(username: User["username"]) {
  return await prisma.user.findUnique({ where: { username } });
}
