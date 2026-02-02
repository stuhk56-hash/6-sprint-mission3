import { ProductLike } from '@prisma/client';
import prisma from '../lib/prisma-client.js';

export async function createFavorite(data: Omit<ProductLike, 'id' | 'createdAt' | 'updatedAt'>) {
  const createdFavorite = await prisma.productLike.create({
    data,
  });
  return createdFavorite;
}

export async function getFavorite(productId: number, userId: number) {
  const favorite = await prisma.productLike.findFirst({
    where: { productId, userId },
  });
  return favorite;
}

export async function deleteFavorite(id: number) {
  await prisma.productLike.delete({
    where: { id },
  });
}

export async function getFavoritesByProductId(productId: number) {
  const favorites = await prisma.productLike.findMany({
    where: { productId },
  });
  return favorites;
}
