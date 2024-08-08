import "server-only";
import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function findOneUserByAuthId() {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized");

  return await prisma.user.findUniqueOrThrow({
    where: { userId: session.user.id },
    select: { userId: true, createdAt: true, username: true },
  });
}
