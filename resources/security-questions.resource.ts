import "server-only";

import prisma from "@/lib/db";

export async function findAllSecurityQuestions() {
  return await prisma.securityQuestion.findMany();
}
