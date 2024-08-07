"use server";

import * as v from "valibot";
import { ForgotPasswordSchema } from "@/validators/forgot-password.validator";
import { findOneUserByUsername } from "@/resources/users.resource";
import argon2 from "argon2";
import prisma from "@/lib/db";

type Res =
  | { error: v.FlatErrors<undefined>; status: 400 }
  | { error: string; status: 404 | 409 | 500 }
  | { error: null; status: 200 };

export async function forgotPasswordAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(ForgotPasswordSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);
    return { error: flatErrors, status: 400 };
  }

  const output = parsedValues.output;

  try {
    const existingUser = await findOneUserByUsername(output.username);

    if (!existingUser?.userId || existingUser.username !== output.username) {
      return { error: "Oops. Something went wrong", status: 409 };
    }

    if (
      existingUser.securityQuestionId !== output.securityQuestionId ||
      existingUser.securityAnswer !== output.securityAnswer
    ) {
      return { error: "Oops. Invalid security answer", status: 404 };
    }

    const hashedPassword = await argon2.hash(output.password);

    await prisma.user.update({
      where: {
        userId: existingUser.userId,
        securityAnswer: output.securityAnswer,
        security_question: { questionId: output.securityQuestionId },
      },
      data: { password: hashedPassword },
    });

    return { error: null, status: 200 };
  } catch (err) {
    console.error(err);
    return { error: "Internal Server Error", status: 500 };
  }
}
