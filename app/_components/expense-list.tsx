"use client";

import { EXPENSES_PER_PAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Type, type Expense } from "@prisma/client";

type ExpenseListProps = { expenses: Array<Expense> };

export const ExpenseList = ({ expenses }: ExpenseListProps) => {
  return (
    <ul>
      {expenses.slice(0, EXPENSES_PER_PAGE).map((expense) => (
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
  );
};
