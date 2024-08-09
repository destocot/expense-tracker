"use server";

import * as v from "valibot";
import { CreateExpenseSchema } from "@/validators/create-expense.validator";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { findOneUserByAuthId } from "@/resources/auth.resource";
import type { Type } from "@prisma/client";

type Res =
  | { error: v.FlatErrors<undefined>; status: 400 }
  | { error: string; status: 500 }
  | { error: null; status: 200; type: Type };

export async function createExpenseAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(CreateExpenseSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);
    return { error: flatErrors, status: 400 };
  }

  const output = parsedValues.output;

  try {
    const currentUser = await findOneUserByAuthId();

    const newExpense = await prisma.expense.create({
      data: {
        amount: output.amount,
        description: output.description,
        type: output.type,
        userId: currentUser.userId,
      },
      select: { type: true },
    });

    revalidatePath("/");

    return { error: null, status: 200, type: newExpense.type };
  } catch (err) {
    console.error(err);
    return { error: "Internal Server Error", status: 500 };
  }
}
