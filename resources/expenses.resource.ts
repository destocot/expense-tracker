import "server-only";

import prisma from "@/lib/db";

import type { User as AuthUser } from "next-auth";
import { EXPENSES_PER_PAGE } from "@/lib/constants";

export async function findAllExpensesByUserId(
  userId: AuthUser["id"],
  options?: {
    page?: number;
    take?: number;
  }
) {
  const page = options?.page ?? 1;
  const take = options?.take ?? EXPENSES_PER_PAGE;

  return await prisma.expense.findMany({
    where: { userId },
    take,
    skip: (page - 1) * take,
    orderBy: { createdAt: "desc" },
  });
}
