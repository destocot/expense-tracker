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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupSchema } from "@/validators/signup.validator";
import type { SignupInput } from "@/validators/signup.validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import type { SecurityQuestion } from "@prisma/client";
import { signupAction } from "@/actions/signup.action";
import { PasswordInput } from "@/components/password-input";
import { useRouter } from "next/navigation";

type SignupFormProps = { securityQuestions: Array<SecurityQuestion> };

export const SignupForm = ({ securityQuestions }: SignupFormProps) => {
  const router = useRouter();

  const form = useForm<SignupInput>({
    resolver: valibotResolver(SignupSchema),
  });

  const { handleSubmit, control, watch, setError, formState } = form;

  const submit = async (values: SignupInput) => {
    const res = await signupAction(values);

    switch (res.status) {
      case 200:
        router.replace("/");
        break;
      case 400:
        const nestedErrors = res.error.nested;

        for (const _field in nestedErrors) {
          const field = _field as keyof SignupInput;
          const message = nestedErrors[field]?.[0];
          setError(field, { message });
        }
        break;
      case 409:
      case 500:
      default:
        const error = res.error || "Internal Server Error";
        setError("securityAnswer", { message: error });
    }
  };

  const watchSecurityQuestionId = watch("securityQuestionId");

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

        <div className="flex flex-col gap-y-2">
          <FormField
            control={control}
            name="securityQuestionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Question</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-left">
                      <SelectValue placeholder="Please select a security question" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {securityQuestions.map((item) => (
                      <SelectItem key={item.questionId} value={item.questionId}>
                        {item.question}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {!!watchSecurityQuestionId && (
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
          )}
        </div>

        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
