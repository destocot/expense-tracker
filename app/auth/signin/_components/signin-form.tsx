"use client";

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
import { useForm } from "react-hook-form";
import { SigninSchema } from "@/validators/signin.validator";
import type { SigninInput } from "@/validators/signin.validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { signinAction } from "@/actions/signin.action";
import { PasswordInput } from "@/components/password-input";

export const SigninForm = () => {
  const form = useForm<SigninInput>({
    resolver: valibotResolver(SigninSchema),
  });

  const { handleSubmit, control, formState, setError } = form;

  const submit = async (values: SigninInput) => {
    const res = await signinAction(values);

    if (res?.error) {
      const error = res.error || "Internal Server Error";
      setError("password", { message: error });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};
