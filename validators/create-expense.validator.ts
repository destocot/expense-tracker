import * as v from "valibot";
import { TYPES } from "@/lib/constants";

export const CreateExpenseSchema = v.object({
  description: v.pipe(
    v.string("Your content must be a string."),
    v.nonEmpty("Please enter a description."),
    v.minLength(6, "Your description must must have 6 characters or more.")
  ),
  amount: v.union(
    [
      v.pipe(
        v.string("Your price must be a string."),
        v.nonEmpty("Please enter a price."),
        v.transform((input) => parseFloat(input)),
        v.minValue(0, "Your price must be greater than or equal to 0.")
      ),
      v.pipe(
        v.number("Your price must be a number."),
        v.minValue(0, "Your price must be greater than or equal to 0.")
      ),
    ],
    "Your price must be a number."
  ),
  type: v.picklist(TYPES, "Your type must be either income or expense."),
});

export type CreateExpenseInput = v.InferInput<typeof CreateExpenseSchema>;
