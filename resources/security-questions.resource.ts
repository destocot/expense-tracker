import "server-only";

import prisma from "@/lib/db";
import { cache } from "react";

async function _findAllSecurityQuestions() {
  return await prisma.securityQuestion.findMany();
}

export const findAllSecurityQuestions = cache(_findAllSecurityQuestions);
