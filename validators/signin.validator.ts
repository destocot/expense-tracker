import * as v from "valibot";

export const SigninSchema = v.object({
  username: v.pipe(
    v.string("Your username must be a string."),
    v.nonEmpty("Please enter a username.")
  ),
  password: v.pipe(
    v.string("Your password must be a string."),
    v.nonEmpty("Please enter a password.")
  ),
});

export type SigninInput = v.InferInput<typeof SigninSchema>;
