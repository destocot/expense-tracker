import { auth } from "@/auth";
import { SignoutButton } from "@/components/signout-button";
import { CreateExpenseForm } from "./_components/create-expense-form";
import { Logo } from "@/components/logo";
import { findAllExpensesByUserId } from "@/resources/expenses.resource";
import { cn } from "@/lib/utils";
import { Type } from "@prisma/client";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.userId) throw new Error("Unauthorized");

  const expenses = await findAllExpensesByUserId(session.user.userId);

  return (
    <main>
      <div className="container max-w-xl py-24">
        <Logo />

        <div className="flex justify-between items-center mt-5">
          <h2 className="text-2xl font-bold tracking-tight">
            {session.user.username}
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
              <li key={expense.expenseId} className="mt-2">
                <div
                  className={cn("flex justify-between items-center", {
                    "bg-success/50 p-2 rounded": expense.type === Type.INCOME,
                    "bg-destructive/50 p-2 rounded":
                      expense.type === Type.EXPENSE,
                  })}
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
