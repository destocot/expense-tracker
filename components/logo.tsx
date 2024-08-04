import { cn } from "@/lib/utils";

type LogoProps = {
  className?: React.HTMLAttributes<HTMLHeadingElement>["className"];
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tight px-1 bg-primary w-fit rounded",
        className
      )}
    >
      Expense Gumshoe
    </h1>
  );
};
