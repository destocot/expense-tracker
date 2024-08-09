import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

type PaginationProps = { hasNext: boolean; currPage: number };

export const Pagination = ({ hasNext, currPage }: PaginationProps) => {
  const hasPrev = currPage > 1;
  const prevHref = `/pg/${currPage - 1}`;
  const nextHref = `/pg/${currPage + 1}`;

  return (
    <>
      <div className="inline-flex gap-x-2">
        <PaginationArrow
          href={prevHref}
          direction="prev"
          isDisabled={!hasPrev}
        />

        <PaginationArrow
          href={nextHref}
          direction="next"
          isDisabled={!hasNext}
        />
      </div>
    </>
  );
};

type PaginationArrowProps = {
  href: string;
  direction: "prev" | "next";
  isDisabled: boolean;
};

const PaginationArrow = ({
  href,
  direction,
  isDisabled,
}: PaginationArrowProps) => {
  return (
    <Button
      variant="default"
      className="h-6"
      disabled={isDisabled}
      asChild={!isDisabled}
    >
      <Link href={href}>
        {direction === "prev" ? (
          <ArrowLeftIcon className="size-4" />
        ) : (
          <ArrowRightIcon className="size-4" />
        )}
      </Link>
    </Button>
  );
};
