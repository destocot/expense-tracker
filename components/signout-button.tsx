"use client";

import { signoutAction } from "@/actions/signout.action";
import { Button } from "./ui/button";

export const SignoutButton = () => {
  const clickHandler = async () => {
    await signoutAction();
  };

  return (
    <Button variant="destructive" size="sm" onClick={clickHandler}>
      Sign Out
    </Button>
  );
};
