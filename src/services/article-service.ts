import prisma from "../lib/prisma-client.js";
import { Prisma } from "@prisma/client";

export const createArticle = async (
  userId: number,
  data: { title: string; content: string }
) => {
  return prisma.article.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const getArticles = async (
  skip: number,
  take: number,
  where: Prisma.ArticleWhereInput,
  orderBy: Prisma.ArticleOrderByWithRelationInput
) => {
  const [totalCount, list] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { user: { select: { id: true, nickname: true } } },
    }),
  ]);
  return { totalCount, list };
};

export const getArticleById = async (id: number) => {
  return prisma.article.findUnique({
    where: { id },
    include: { user: { select: { id: true, nickname: true } } },
  });
};

export const updateArticle = async (
  id: number,
  data: { title?: string; content?: string }
) => {
  return prisma.article.update({ where: { id }, data });
};

export const deleteArticle = async (id: number) => {
  return prisma.article.delete({ where: { id } });
};
