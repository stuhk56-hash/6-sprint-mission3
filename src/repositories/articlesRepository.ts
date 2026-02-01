import { Article } from '@prisma/client';
import prisma from '../lib/prisma-client.js';
import { PagePaginationParams } from '../types/pagination.js';

export async function createArticle(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) {
  const createdArticle = await prisma.article.create({
    data,
  });
  return createdArticle;
}

export async function getArticle(id: number) {
  const article = await prisma.article.findUnique({ where: { id } });
  return article;
}

export async function getArticleWithLkes(id: number, { userId }: { userId?: number } = {}) {
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      articleLike: true,
    },
  });

  if (!article) {
    return null;
  }

  return {
    ...article,
    articleLike: undefined,
    likeCount: article.articleLike.length,
    isLiked: userId ? article.articleLike.some((like) => like.userId === userId) : undefined,
  };
}

export async function getArticleListWithLikes(
  { page, pageSize, orderBy, keyword }: PagePaginationParams,
  {
    userId,
  }: {
    userId?: number;
  } = {},
) {
  const where = {
    title: keyword ? { contains: keyword } : undefined,
  };

  const totalCount = await prisma.article.count({ where });
  const articles = await prisma.article.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: orderBy === 'recent' ? { createdAt: 'desc' } : { id: 'asc' },
    where,
    include: {
      articleLike: true,
    },
  });

  const mappedArticles = articles.map((article) => ({
    ...article,
    articleLike: undefined,
    likeCount: article.articleLike.length,
    isLiked: userId ? article.articleLike.some((like) => like.userId === userId) : undefined,
  }));

  return {
    list: mappedArticles,
    totalCount,
  };
}

export async function updateArticleWithLikes(id: number, data: Partial<Article>) {
  const updatedArticle = await prisma.article.update({
    where: { id },
    data,
    include: {
      articleLike: true,
    },
  });
  return {
    ...updatedArticle,
    likeCount: updatedArticle.articleLike.length,
    isLiked: undefined,
  };
}

export async function deleteArticle(id: number) {
  return prisma.article.delete({
    where: { id },
  });
}
