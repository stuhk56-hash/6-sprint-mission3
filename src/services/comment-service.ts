import { prisma } from "../lib/prisma-client.js";
import { ApiError } from "../lib/errors/ApiError.js";

const DEFAULT_LIMIT = 10;

// --- Article Comments ---

/**
 * 게시글 존재 확인
 */
const checkArticleExists = async (articleId: number) => {
  const article = await prisma.article.findUnique({ where: { id: articleId } });
  if (!article) {
    throw ApiError.notFound("댓글을 작성할 게시글을 찾을 수 없습니다.");
  }
};

/**
 * 게시글 댓글 생성
 */
export const createArticleComment = async (
  articleId: number,
  userId: number,
  content: string
) => {
  await checkArticleExists(articleId);
  return prisma.articleComment.create({
    data: {
      content,
      articleId,
      userId,
    },
  });
};

/**
 * 게시글 댓글 목록 조회
 */
export const getArticleComments = async (
  articleId: number,
  cursor?: number,
  limit: number = DEFAULT_LIMIT
) => {
  await checkArticleExists(articleId);

  const cursorOptions = cursor ? { id: cursor } : undefined;
  const skip = cursor ? 1 : 0;

  const comments = await prisma.articleComment.findMany({
    where: { articleId },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
    take: limit,
    skip,
    ...(cursorOptions && { cursor: cursorOptions }),
    orderBy: {
      id: "desc",
    },
  });

  const nextCursor =
    comments.length === limit
      ? (comments[comments.length - 1]?.id ?? null)
      : null;
  return { comments, nextCursor };
};

/**
 * 게시글 댓글 수정
 */
export const updateArticleComment = async (
  commentId: number,
  userId: number,
  content: string
) => {
  const comment = await prisma.articleComment.findUnique({
    where: { id: commentId },
  });
  if (!comment) {
    throw ApiError.notFound("수정할 댓글을 찾을 수 없습니다.");
  }
  if (comment.userId !== userId) {
    throw ApiError.forbidden("댓글을 수정할 권한이 없습니다.");
  }
  return prisma.articleComment.update({
    where: { id: commentId },
    data: { content },
  });
};

/**
 * 게시글 댓글 삭제
 */
export const deleteArticleComment = async (
  commentId: number,
  userId: number
) => {
  const comment = await prisma.articleComment.findUnique({
    where: { id: commentId },
  });
  if (!comment) {
    throw ApiError.notFound("삭제할 댓글을 찾을 수 없습니다.");
  }
  if (comment.userId !== userId) {
    throw ApiError.forbidden("댓글을 삭제할 권한이 없습니다.");
  }
  await prisma.articleComment.delete({ where: { id: commentId } });
};

// --- Product Comments ---

/**
 * 상품 존재 확인
 */
const checkProductExists = async (productId: number) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw ApiError.notFound("댓글을 작성할 상품을 찾을 수 없습니다.");
  }
};

/**
 * 상품 댓글 생성
 */
export const createProductComment = async (
  productId: number,
  userId: number,
  content: string
) => {
  await checkProductExists(productId);
  return prisma.productComment.create({
    data: {
      content,
      productId,
      userId,
    },
  });
};

/**
 * 상품 댓글 목록 조회
 */
export const getProductComments = async (
  productId: number,
  cursor?: number,
  limit: number = DEFAULT_LIMIT
) => {
  await checkProductExists(productId);
  const cursorOptions = cursor ? { id: cursor } : undefined;
  const skip = cursor ? 1 : 0;

  const comments = await prisma.productComment.findMany({
    where: { productId },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
    take: limit,
    skip,
    cursor: cursorOptions,
    orderBy: {
      id: "desc",
    },
  });

  const nextCursor =
    comments.length === limit
      ? (comments[comments.length - 1]?.id ?? null)
      : null;

  return { comments, nextCursor };
};

/**
 * 상품 댓글 수정
 */
export const updateProductComment = async (
  commentId: number,
  userId: number,
  content: string
) => {
  const comment = await prisma.productComment.findUnique({
    where: { id: commentId },
  });
  if (!comment) {
    throw ApiError.notFound("수정할 댓글을 찾을 수 없습니다.");
  }
  if (comment.userId !== userId) {
    throw ApiError.forbidden("댓글을 수정할 권한이 없습니다.");
  }
  return prisma.productComment.update({
    where: { id: commentId },
    data: { content },
  });
};

/**
 * 상품 댓글 삭제
 */
export const deleteProductComment = async (
  commentId: number,
  userId: number
) => {
  const comment = await prisma.productComment.findUnique({
    where: { id: commentId },
  });
  if (!comment) {
    throw ApiError.notFound("삭제할 댓글을 찾을 수 없습니다.");
  }
  if (comment.userId !== userId) {
    throw ApiError.forbidden("댓글을 삭제할 권한이 없습니다.");
  }
  await prisma.productComment.delete({ where: { id: commentId } });
};
