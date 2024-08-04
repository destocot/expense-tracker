import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SigninForm } from "./_components/signin-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>

          <CardContent>
            <SigninForm />
          </CardContent>

          <CardFooter className="flex-col items-start">
            <p className="text-muted-foreground text-sm">
              Don&apos;t have an account? Click{" "}
              <Button variant="link" size="sm" className="px-0" asChild>
                <Link href="/auth/signup">here</Link>
              </Button>{" "}
              to sign up.
            </p>

            {/* <p className="text-muted-foreground text-sm">
              Forgot your password? Click{" "}
              <Button variant="link" size="sm" className="px-0">
                here
              </Button>
            </p> */}
          </CardFooter>
        </Card>
      </div>

      <div className="bg-primary h-full w-full flex-1 hidden lg:block" />
    </main>
  );
}
