"use server";

import * as v from "valibot";
import { CreateExpenseSchema } from "@/validators/create-expense.validator";
import prisma from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

type Res =
  | { error: v.FlatErrors<undefined>; status: 400 }
  | { error: string; status: 401 | 500 }
  | { error: null; status: 200 };

export async function createExpenseAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(CreateExpenseSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);
    return { error: flatErrors, status: 400 };
  }

  const output = parsedValues.output;

  const session = await auth();

  if (!session?.user?.userId) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    await prisma.expense.create({
      data: {
        amount: output.amount,
        description: output.description,
        type: output.type,
        userId: session.user.userId,
      },
    });

    revalidatePath("/");

    return { error: null, status: 200 };
  } catch (err) {
    console.error(err);
    return { error: "Internal Server Error", status: 500 };
  }
}
