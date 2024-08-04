"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

type Res = { error: string; status: 401 | 500 } | undefined;

export async function signinAction(_values: unknown): Promise<Res> {
  try {
    const values = validateJsonObject(_values);
    await signIn("credentials", values);
  } catch (err) {
    if (isRedirectError(err)) throw err;

    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            error: "Invalid credentials",
            status: 401,
          };
        default:
          return { error: "Oops. Something went wrong", status: 500 };
      }
    }

    console.error(err);
    return { error: "Internal Server Error", status: 500 };
  }
}

function validateJsonObject(values: unknown): object {
  if (typeof values !== "object" || values === null || Array.isArray(values)) {
    throw new Error("Invalid JSON Object");
  }

  return values;
}
