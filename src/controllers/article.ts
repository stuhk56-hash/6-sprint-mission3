import { Request, response, Response } from 'express';
import prisma from 'prisma/client/article.ts';
import { DEFAULT_PAGE, DEFAULT_LIMIT, SORT_DESC } from '../constants/index.js';

const prisma = new PrismaClient();

/**
 * [GET /api/articles]
 * 게시글 목록 조회 (페이지네이션, 검색, 정렬)
 */
export const getAllArticles = async (req: Request, res: Response) => {
  try {
  // query 파싱
  const search = req.query.search as string | undefined;
  const pageNum = Number(req.query.page) || 1;
  const limitNum = Number(req.query.limit) || 10;

  // 페이지네이션
  const skip = (pageNum - 1) * limitNum;
  const take = limitNum;

  // 정렬 조건 (기본값: 최신순)
  const orderBy = {
    createAt: 'desc' as const,
  };
  
  // 검색 조건
  const where = search
    ? {
        OR: [
          {
            title: { contains: String(search), mode: 'insensitive' },
          },
          {
            content: { contains: String(search), mode: 'insensitive' },
          },
        ],
      }
    : {};

  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    where,
    skip,
    take,
    orderBy,
  });

  const totalCount = await prisma.article.count({ where });
  const totalPages = Math.ceil(totalCount / limitNum);

  return res.status(200).json({
    data: articles,
    pagination: {
      totalCount,
      totalPages,
      currentPage: pageNum,
      limit: limitNum,
    },
  });
};

} catch (error) {
  console.error('Error fetching articles:', error);
  return response.status(500).json({
  message: 'Failed to fetch articles',
  });
};
    
 /**
 * [POST /api/articles]
 * 새 게시글 등록
 */
export const createArticle = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const newArticle = await prisma.article.create({
    data: {
      title,
      content,
    },
  });

  return res.status(201).json(newArticle);
};

/**
 * [GET /api/articles/:id]
 * 게시글 상세 조회
 */
export const getArticleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });

  if (!article) {
    throw ApiError.notFound('게시글을 찾을 수 없습니다.');
  }

  return res.status(200).json(article);
};

/**
 * [PATCH /api/articles/:id]
 * 게시글 수정
 */
export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const dataToUpdate: Record<string, any> = {};
  if (title) dataToUpdate.title = title;
  if (content) dataToUpdate.content = content;

  try {
    const updatedArticle = await prisma.article.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    return res.status(200).json(updatedArticle);
  } catch (error) {
    throw error;
  }
};

/**
 * [DELETE /api/articles/:id]
 * 게시글 삭제
 */
export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.article.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  } catch (error) {
    throw error;
  }
};
