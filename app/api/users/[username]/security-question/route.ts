import { findOneUserByUsername } from "@/resources/users.resource";
import type { User } from "@prisma/client";

import * as v from "valibot";
import { ForgotPasswordSchemaUsername } from "@/validators/forgot-password.validator";

export async function GET(
  req: Request,
  { params }: { params: { username: User["username"] } }
) {
  const username = params.username;

  const parsedUsername = v.safeParse(ForgotPasswordSchemaUsername, username);

  if (!parsedUsername.success) {
    return Response.json(
      { error: parsedUsername.issues[0].message },
      { status: 400 }
    );
  }

  const user = await findOneUserByUsername(parsedUsername.output, {
    withSecurityQuestion: true,
  });

  if (!user?.securityQuestion) {
    return Response.json(
      { error: "Oops. Something went wrong" },
      { status: 404 }
    );
  } else {
    return Response.json({ data: user.securityQuestion });
  }
}
