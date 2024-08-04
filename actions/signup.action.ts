"use server";

import prisma from "@/lib/db";
import { findOneUserByUsername } from "@/resources/users.resource";
import { SignupSchema } from "@/validators/signup.validator";
import type { SignupOutput } from "@/validators/signup.validator";
import argon2 from "argon2";
import * as v from "valibot";

type Res =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; status: 400 }
  | { success: false; error: string; status: 409 | 500 };

export async function signupAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(SignupSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);
    return { success: false, error: flatErrors, status: 400 };
  }

  const output = parsedValues.output;

  try {
    const existingUser = await findOneUserByUsername(output.username);

    if (existingUser?.userId) {
      return {
        success: false,
        error: "Username already exists",
        status: 409,
      };
    }

    await CreateUser(output);

    return { success: true };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Internal server error",
      status: 500,
    };
  }
}

async function CreateUser(output: SignupOutput) {
  const hashedPassword = await argon2.hash(output.password);

  await prisma.user.create({
    data: {
      username: output.username,
      password: hashedPassword,
      security_question: {
        connect: {
          questionId: output.securityQuestionId,
        },
      },
      securityAnswer: output.securityAnswer,
    },
  });
}
