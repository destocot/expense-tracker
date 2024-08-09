import type { Type } from "@prisma/client";

export const TYPES: ReadonlyArray<Type> = ["EXPENSE", "INCOME"] as const;
export const EXPENSES_PER_PAGE = 10;
