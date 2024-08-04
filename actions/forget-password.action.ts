"use server";

import * as v from "valibot";
import { ForgotPasswordSchema } from "@/validators/forgot-password.validator";
import { findOneUserByUsername } from "@/resources/users.resource";
import argon2 from "argon2";
import prisma from "@/lib/db";

export async function forgotPasswordAction(values: unknown) {
  const parsedValues = v.safeParse(ForgotPasswordSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);
    return { error: flatErrors, status: 400 };
  }

  const output = parsedValues.output;

  try {
    const existingUser = await findOneUserByUsername(output.username);

    if (!existingUser?.userId) {
      return { error: "Oops. Something went wrong", status: 409 };
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
