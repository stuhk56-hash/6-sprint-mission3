import type { ArticleComment, Prisma } from '@prisma/client';
import prisma from '../lib/prisma-client.js';
import type { CursorPaginationParams } from '../types/pagination.js';

export async function createComment(data: Omit<ArticleComment, 'id' | 'createdAt' | 'updatedAt'>) {
  const createdComment = await prisma.articleComment.create({
    data,
  });
  return createdComment;
}

export async function getComment(id: number) {
  const comment = await prisma.articleComment.findUnique({
    where: { id },
  });
  return comment;
}

export async function getCommentList(
  where: { articleId?: number; productId?: number },
  { cursor, limit }: CursorPaginationParams,
) {
  const queryArgs: Prisma.ArticleCommentFindManyArgs = {
    take: limit + 1,
    where,
    orderBy: { createdAt: 'desc' },
  };

  if (cursor) {
    queryArgs.cursor = { id: cursor };
  }

  const commentsWithCursor = await prisma.articleComment.findMany(queryArgs);
  const comments = commentsWithCursor.slice(0, limit);
  const cursorComment = commentsWithCursor[commentsWithCursor.length - 1];
  const nextCursor = cursorComment ? cursorComment.id : null;

  return {
    list: comments,
    nextCursor,
  };
}

export async function updateComment(id: number, data: Partial<ArticleComment>) {
  return prisma.articleComment.update({
    where: { id },
    data,
  });
}

export async function deleteComment(id: number) {
  return prisma.articleComment.delete({
    where: { id },
  });
}
