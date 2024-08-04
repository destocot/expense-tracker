import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "./_components/signup-form";
import Link from "next/link";
import { findAllSecurityQuestions } from "@/resources/security-questions.resource";

export default async function Page() {
  const securityQuestions = await findAllSecurityQuestions();

  return (
    <main className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>

          <CardContent>
            <SignupForm securityQuestions={securityQuestions} />
          </CardContent>

          <CardFooter className="items-start">
            <p className="text-muted-foreground text-sm">
              Already have an account? Click{" "}
              <Button variant="link" size="sm" className="px-0" asChild>
                <Link href="/auth/signin">here</Link>
              </Button>{" "}
              to sign in.
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-primary h-full w-full flex-1 hidden lg:block" />
    </main>
  );
}