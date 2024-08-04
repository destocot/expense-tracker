import * as v from "valibot";

export const SignupSchema = v.pipe(
  v.object({
    username: v.pipe(
      v.string("Your username must be a string."),
      v.nonEmpty("Please enter a username."),
      v.minLength(6, "Your username must have 6 characters or more.")
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
    securityQuestionId: v.pipe(
      v.string("Your security question must be a string."),
      v.nonEmpty("Please select a security question."),
      v.length(24, "Please select a valid security question.")
    ),
    securityAnswer: v.pipe(
      v.string("Your answer must be a string."),
      v.nonEmpty("Please enter an answer."),
      v.minLength(4, "Your answer must have 4 characters or more.")
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

export type SignupInput = v.InferInput<typeof SignupSchema>;
export type SignupOutput = v.InferOutput<typeof SignupSchema>;
