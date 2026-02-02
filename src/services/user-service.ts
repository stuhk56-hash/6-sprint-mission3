import { verifyAccessToken } from "../utils/token.js";
import prisma from "../lib/prisma-client.js";

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const authenticate = async (token: string) => {
  if (!token) {
    return null;
  }
  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    return user;
  } catch (error) {
    return null;
  }
};
