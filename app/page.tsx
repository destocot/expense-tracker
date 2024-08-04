import { auth } from "@/auth";
import { SignoutButton } from "@/components/signout-button";

export default async function Page() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return (
    <main>
      <div className="container max-w-xl py-24">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          Expense Gumshoe
        </h1>

        <div className="flex justify-between items-center mt-10">
          <h2 className="text-2xl font-bold tracking-tight">
            {session.user.username}
          </h2>
          <SignoutButton />
        </div>
      </div>
    </main>
  );
}
