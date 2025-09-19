import { verifyPassword } from "@/utils/passwordHash";
import { prisma } from "./prisma";

export async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });
}

export async function verifyUser(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return null;
  }

  const isPasswordMatched = await verifyPassword(password, user.password || "");

  if (user && isPasswordMatched) {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.firstName
        ? `${user.firstName} ${user.lastName || ""}`.trim()
        : user.email,
      role: user.role,
    };
  }

  return null;
}
