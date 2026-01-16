import prisma from "../lib/prisma-client.js";

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
