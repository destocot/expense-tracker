"use client";

import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { BadgePlusIcon, DollarSignIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateExpenseSchema } from "@/validators/create-expense.validator";
import type { CreateExpenseInput } from "@/validators/create-expense.validator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TYPES } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import { createExpenseAction } from "@/actions/create-expense.action";
import { useRef } from "react";

export const CreateExpenseForm = () => {
  const radioGroupRef = useRef<HTMLDivElement>(null);

  const form = useForm<CreateExpenseInput>({
    resolver: valibotResolver(CreateExpenseSchema),
    defaultValues: { description: "", amount: "", type: TYPES[0] },
  });

  const { handleSubmit, control, formState, setError, reset } = form;

  const submit = async (values: CreateExpenseInput) => {
    const res = await createExpenseAction(values);
    switch (res.status) {
      case 200:
        reset();
        break;
      case 400:
        const nestedErrors = res.error.nested;

        for (const _field in nestedErrors) {
          const field = _field as keyof CreateExpenseInput;
          const message = nestedErrors[field]?.[0];
          setError(field, { message });
        }
        break;
      case 401:
      case 500:
      default:
        const error = res.error || "Internal Server Error";
        setError("type", { message: error });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className="space-y-2 flex flex-col">
        <div className="space-x-2 flex items-center">
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-[2]">
                <FormControl>
                  <Input type="text" placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-[1]">
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Amount"
                      className="[&::-webkit-inner-spin-button]:appearance-none ps-6"
                      {...field}
                    />
                    <DollarSignIcon
                      className="text-muted-foreground absolute top-1/2 -translate-y-1/2 left-1.5"
                      size={16}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" size="icon" disabled={formState.isSubmitting}>
            <BadgePlusIcon size={16} />
          </Button>
        </div>

        <div>
          <FormMessage>{formState.errors.description?.message}</FormMessage>
          <FormMessage>{formState.errors.amount?.message}</FormMessage>
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-1 items-center"
                >
                  {TYPES.map((type) => {
                    return (
                      <FormItem
                        key={type}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={type} />
                        </FormControl>
                        <FormLabel>{capitalize(type)}</FormLabel>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
