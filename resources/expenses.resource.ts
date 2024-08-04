import "server-only";

import prisma from "@/lib/db";

import type { User as AuthUser } from "next-auth";

export async function findAllExpensesByUserId(userId: AuthUser["userId"]) {
  return await prisma.expense.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
