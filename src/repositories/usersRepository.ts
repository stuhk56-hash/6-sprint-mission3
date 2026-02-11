import type { User } from '@prisma/client';
import prisma from '../lib/prisma-client.js';

export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  const createdUser = await prisma.user.create({
    data,
  });
  return createdUser;
}

export async function getUser(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export async function updateUser(id: number, data: Partial<User>) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser;
}

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: { id },
  });
}
