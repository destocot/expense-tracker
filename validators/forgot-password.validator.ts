import * as v from "valibot";

export const ForgotPasswordSchemaUsername = v.pipe(
  v.string("Your username must be a string."),
  v.nonEmpty("Please enter a username.")
);

export const ForgotPasswordSchema = v.pipe(
  v.object({
    username: ForgotPasswordSchemaUsername,
    securityQuestionId: v.pipe(
      v.string("Your security question must be a string."),
      v.nonEmpty("Please select a security question.")
    ),
    securityAnswer: v.pipe(
      v.string("Your answer must be a string."),
      v.nonEmpty("Please enter an answer.")
    ),
    password: v.pipe(
      v.string("Your password must be a string."),
      v.nonEmpty("Please enter a password."),
      v.minLength(6, "Your password must have 6 characters or more.")
    ),
    confirmPassword: v.pipe(
      v.string("Your password must be a string."),
      v.nonEmpty("Please enter a password.")
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "The two passwords do not match."
    ),
    ["confirmPassword"]
  )
);
export type ForgotPasswordInput = v.InferInput<typeof ForgotPasswordSchema>;
