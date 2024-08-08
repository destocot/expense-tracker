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
import { ForgotPasswordSchema } from "@/validators/forgot-password.validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ArrowLeftSquareIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState(false);
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
    let flag = false;

    switch (res.status) {
      case 200:
        setSuccess(true);
        break;
      case 400:
        const nestedErrors = res.error.nested;

        for (const _field in nestedErrors) {
          const field = _field as keyof ForgotPasswordInput;
          const message = nestedErrors[field]?.[0];
          setError(field, { message });

          if (["securityQuestionId", "securityAnswer"].includes(field)) {
            flag = true;
          }
        }
        break;
      case 404:
        setError("securityAnswer", { message: res.error });
        flag = true;
        break;
      case 409:
      case 500:
      default:
        setError("confirmPassword", { message: res.error });
    }

    if (flag) setPage(2);
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
      setValue("securityAnswer", "");
      setValue("password", "");
      setValue("confirmPassword", "");
      setPage(2);
    }

    setIsPending(false);
  };

  const handlePage2 = () => {
    setPage(3);
  };

  const handleBack = () => {
    setPage((page) => {
      if (page === 3) return 2;
      else if (page === 2) return 1;
      return 1;
    });
  };

  if (!success) {
    return (
      <div>
        <p>Password has been successfully reset!</p>

        <span>
          Click{" "}
          <Button className="py-0 h-fit" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>{" "}
          to sign in.
        </span>
      </div>
    );
  }

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
                      <Input
                        {...field}
                        placeholder="Your Answer"
                        onKeyDown={(evt) => {
                          if (evt.key === "Enter") setPage(3);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-x-2">
              <Button type="button" size="icon" onClick={handleBack}>
                <ArrowLeftSquareIcon />
              </Button>
              <Button type="button" onClick={handlePage2} className="w-full">
                Next
              </Button>
            </div>
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

            <div className="flex gap-x-2">
              <Button type="button" size="icon" onClick={handleBack}>
                <ArrowLeftSquareIcon />
              </Button>
              <Button
                type="submit"
                disabled={formState.isSubmitting}
                className="grow"
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};
