"use client";

import { Input } from "@/components/ui/input";
import type { InputProps } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = useState(false);

    const clickHandler = () => {
      setShow((prev) => !prev);
    };

    return (
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          className={cn("pe-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={clickHandler}
          className="absolute top-0 right-0 hover:bg-accent/50"
          tabIndex={-1}
        >
          {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
