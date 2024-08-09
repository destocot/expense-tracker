import { SignoutButton } from "@/components/signout-button";
import { CreateExpenseForm } from "./_components/create-expense-form";
import { Logo } from "@/components/logo";
import { findAllExpensesByUserId } from "@/resources/expenses.resource";
import { findOneUserByAuthId } from "@/resources/auth.resource";
import { Button } from "@/components/ui/button";
import { SiGithub, SiGithubHex } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { ExpenseList } from "./_components/expense-list";
import { Pagination } from "./_components/pagination";
import { EXPENSES_PER_PAGE } from "@/lib/constants";

export default async function Page() {
  const currUser = await findOneUserByAuthId();
  const expenses = await findAllExpensesByUserId(currUser.userId);
  const hasNext = expenses.length > EXPENSES_PER_PAGE;

  return (
    <main>
      <div className="container max-w-xl py-16 flex flex-col gap-y-4">
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

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">
            {currUser.username}
          </h2>
          <SignoutButton />
        </div>

        <div className="relative">
          <CreateExpenseForm />
          <div className="absolute -bottom-2 right-0">
            <Pagination hasNext={hasNext} currPage={1} />
          </div>
        </div>

        <ExpenseList expenses={expenses} />
      </div>
    </main>
  );
}
