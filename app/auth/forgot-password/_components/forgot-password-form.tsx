"use client";

import { forgotPasswordAction } from "@/actions/forget-password.action";
import { PasswordInput } from "@/components/password-input";
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
import type { ForgotPasswordInput } from "@/validators/forgot-password.validator";
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaUsername,
} from "@/validators/forgot-password.validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

export const ForgotPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState<string>("");
  const [page, setPage] = useState<1 | 2 | 3>(1);

  const form = useForm<ForgotPasswordInput>({
    resolver: valibotResolver(ForgotPasswordSchema),
  });

  const { control, handleSubmit, formState, getValues, setValue, setError } =
    form;

  const submit = async (values: ForgotPasswordInput) => {
    const res = await forgotPasswordAction(values);

    // CONTINUE HERE EROR HANDLING
  };

  const handlePage1 = async () => {
    setIsPending(true);

    const username = getValues("username");
    const res = await fetch(`/api/users/${username}/security-question`);
    const securityQuestion = await res.json();

    if (!res.ok) {
      const message = securityQuestion.error ?? "Internal Server Error";
      setError("username", { message });
    } else {
      setValue("securityQuestionId", securityQuestion.data.questionId);
      setSecurityQuestion(securityQuestion.data.question);
      setPage(2);
    }

    setIsPending(false);
  };

  const handlePage2 = () => {
    setPage(3);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        {page === 1 && (
          <>
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
            />{" "}
            <Button
              type="button"
              onClick={handlePage1}
              disabled={isPending}
              className="w-full"
            >
              Next
            </Button>
          </>
        )}

        {page === 2 && (
          <>
            <div className="flex flex-col gap-y-2">
              <FormField
                control={control}
                name="securityQuestionId"
                render={({ field: { value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Security Question</FormLabel>
                    <FormControl>
                      <Input value={securityQuestion} {...field} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="securityAnswer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Your Answer" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="button" onClick={handlePage2} className="w-full">
              Next
            </Button>
          </>
        )}

        {page === 3 && (
          <>
            <div className="flex flex-col gap-y-2">
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

              <FormField
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full"
            >
              Submit
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};
