import { CreateExpenseForm } from "@/app/_components/create-expense-form";
import { ExpenseList } from "@/app/_components/expense-list";
import { Pagination } from "@/app/_components/pagination";
import { Logo } from "@/components/logo";
import { SignoutButton } from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { EXPENSES_PER_PAGE } from "@/lib/constants";
import { parsePage } from "@/lib/utils";
import { findOneUserByAuthId } from "@/resources/auth.resource";
import { findAllExpensesByUserId } from "@/resources/expenses.resource";
import { SiGithub, SiGithubHex } from "@icons-pack/react-simple-icons";
import Link from "next/link";

export default async function Page({ params }: { params: { pg: string } }) {
  const page = parsePage(params.pg);

  const currUser = await findOneUserByAuthId();
  const expenses = await findAllExpensesByUserId(currUser.userId, { page });
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
            <Pagination hasNext={hasNext} currPage={page} />
          </div>
        </div>

        <ExpenseList expenses={expenses} />
      </div>
    </main>
  );
}
