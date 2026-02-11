import type { ArticleLike } from '@prisma/client';
import prisma from '../lib/prisma-client.js';

export async function createLike(data: Omit<ArticleLike, 'id'>) {
  const createdLike = await prisma.articleLike.create({
    data,
  });
  return createdLike;
}

export async function getLike(articleId: number, userId: number) {
  const like = await prisma.articleLike.findFirst({
    where: { articleId, userId },
  });
  return like;
}

export async function deleteLike(id: number) {
  await prisma.articleLike.delete({
    where: { id },
  });
}
