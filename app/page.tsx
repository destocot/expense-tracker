import { SignoutButton } from "@/components/signout-button";
import { CreateExpenseForm } from "./_components/create-expense-form";
import { Logo } from "@/components/logo";
import { findAllExpensesByUserId } from "@/resources/expenses.resource";
import { cn } from "@/lib/utils";
import { Type } from "@prisma/client";
import { findOneUserByAuthId } from "@/resources/auth.resource";
import { Button } from "@/components/ui/button";
import { SiGithub, SiGithubHex } from "@icons-pack/react-simple-icons";
import Link from "next/link";

export default async function Page() {
  const currentUser = await findOneUserByAuthId();

  const expenses = await findAllExpensesByUserId(currentUser.userId);

  return (
    <main>
      <div className="container max-w-xl py-16">
        <div className="flex items-center justify-between">
          <Logo />

          <Button
            className="bg-muted-foreground text-muted hover:bg-muted-foreground/90 scale-90 hover:scale-100 transition-transform"
            size="icon"
            asChild
          >
            <Link
              href="https://github.com/destocot/expense-tracker"
              target="_blank"
            >
              <SiGithub color={SiGithubHex} />
            </Link>
          </Button>
        </div>

        <div className="flex justify-between items-center mt-5">
          <h2 className="text-2xl font-bold tracking-tight">
            {currentUser.username}
          </h2>
          <SignoutButton />
        </div>

        <div className="mt-5">
          <CreateExpenseForm />
        </div>

        <div className="mt-5">
          <h3 className="text-lg font-bold tracking-tight">Expenses</h3>
          <ul className="mt-2">
            {expenses.map((expense) => (
              <li key={expense.expenseId} className="mt-2 relative">
                <div className="bg-background">
                  <div
                    className={cn(
                      "flex justify-between items-center rounded transition-colors p-2",
                      {
                        "bg-success/50 hover:bg-success/30":
                          expense.type === Type.INCOME,
                        "bg-destructive/50 hover:bg-destructive/30":
                          expense.type === Type.EXPENSE,
                      }
                    )}
                  >
                    <div>
                      <p className="text-sm">{expense.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(expense.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      ${expense.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="bg-primary absolute inset-0 h-full w-full rounded -z-10" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
