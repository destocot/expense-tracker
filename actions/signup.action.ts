"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { findOneUserByUsername } from "@/resources/users.resource";
import { SignupSchema } from "@/validators/signup.validator";
import type { SignupOutput } from "@/validators/signup.validator";
import argon2 from "argon2";
import { AuthError } from "next-auth";
import * as v from "valibot";

type Res =
  | { error: v.FlatErrors<undefined>; status: 400 }
  | { error: string; status: 409 | 500 }
  | { error: null; status: 200 };

export async function signupAction(values: unknown): Promise<Res> {
  const parsedValues = v.safeParse(SignupSchema, values);

  if (!parsedValues.success) {
    const flatErrors = v.flatten(parsedValues.issues);
    return { error: flatErrors, status: 400 };
  }

  const output = parsedValues.output;

  try {
    const existingUser = await findOneUserByUsername(output.username);

    if (existingUser?.userId) {
      return { error: "Username already exists", status: 409 };
    }

    await CreateUser(output);
    await signIn("credentials", {
      username: output.username,
      password: output.password,
      redirect: false,
    });

    return { error: null, status: 200 };
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Oops. Something went wrong", status: 500 };
    }

    console.error(err);
    return { error: "Internal Server Error", status: 500 };
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
