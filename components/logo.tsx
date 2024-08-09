import { cn } from "@/lib/utils";
import Link from "next/link";

type LogoProps = {
  className?: React.HTMLAttributes<HTMLHeadingElement>["className"];
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-3xl font-bold tracking-tight px-1 bg-primary w-fit rounded",
        className
      )}
    >
      Expense Gumshoe
    </Link>
  );
};
