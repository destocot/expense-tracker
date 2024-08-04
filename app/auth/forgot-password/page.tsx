import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export default function Page() {
  return (
    <main className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col">
          <Logo className="rounded-b-none" />

          <Card className="w-[400px] rounded-tl-none border-0 sm:border">
            <CardHeader>
              <CardTitle>Forgot Password?</CardTitle>
            </CardHeader>

            <CardContent>
              <ForgotPasswordForm />
            </CardContent>

            <CardFooter className="flex-col items-start">
              <p className="text-muted-foreground text-sm">
                Remember your password? Click{" "}
                <Button variant="link" size="sm" className="px-0" asChild>
                  <Link href="/auth/signin">here</Link>
                </Button>{" "}
                to sign in.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="bg-primary h-full w-full flex-1 hidden lg:block" />
    </main>
  );
}
