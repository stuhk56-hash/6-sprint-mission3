import { withAsync } from "../lib/withAsync.js";
import { prisma } from "../lib/prisma-client.js";
import { Prisma } from "@prisma/client";
import { ApiError } from "../lib/errors/ApiError.js";
import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/authenticate.js";
import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  SORT_RECENT,
  SORT_DESC,
} from "../constants/index.js";

/**
 * [GET /api/products]
 * 상품 목록 조회 (페이지네이션, 검색, 정렬)
 */
export const getAllProducts = withAsync(async (req: Request, res: Response) => {
  // 쿼리 파라미터에서 page, limit, sort, search 추출 및 기본값 적용 (상수 사용)
  const page = parseInt(req.query['page'] as string) || DEFAULT_PAGE;
  const limit = parseInt(req.query['limit'] as string) || DEFAULT_LIMIT;
  const { sort, search } = req.query;

  // Offset 계산
  const skip = (page - 1) * limit;
  const take = limit;

  // 정렬 조건 설정: 'recent'이면 createdAt 기준으로 내림차순 정렬
  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === SORT_RECENT
      ? { createdAt: SORT_DESC as Prisma.SortOrder }
      : { createdAt: SORT_DESC as Prisma.SortOrder }; // 기본값도 최신순(DESC)

  // 검색 조건 설정: name 또는 description에 검색어가 포함된 경우 (대소문자 미구분)
  const where: Prisma.ProductWhereInput = search
    ? {
        OR: [
          { name: { contains: search as string, mode: "insensitive" } },
          { description: { contains: search as string, mode: "insensitive" } },
        ],
      }
    : {};

  // 1. 데이터 조회
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
    },
    where,
    skip,
    take,
    orderBy,
  });

  // 2. 전체 카운트 조회
  const totalCount = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalCount / limit);

  // 200 OK 상태 코드와 함께 데이터 및 페이지네이션 정보 반환
  res.status(200).json({
    data: products,
    pagination: {
      totalCount,
      totalPages,
      currentPage: page,
      limit,
    },
  });
});

/**
 * [POST /api/products]
 * 새 상품 등록
 * 유효성 검사 (validators 미들웨어) 후 실행됨
 */
export const createProduct = withAsync(async (req: Request, res: Response) => {
  const { name, description, price, tags = [], stock = 0 } = req.body;
  const user = (req as AuthRequest).user;

  if (!user) {
    throw ApiError.forbidden("User not authenticated");
  }

  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      // price는 Number 타입으로 저장되도록 유효성 검사 미들웨어에서 확인됨
      price: Number(price),
      // tags는 String[] 타입으로 저장
      tags: tags as any,
      stock: Number(stock),
      userId: user.id,
    },
  });

  // 201 Created 상태 코드
  res.status(201).json(newProduct);
});

/**
 * [GET /api/products/:id]
 * 상품 상세 조회
 */
export const getProductById = withAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      createdAt: true,
    },
  });

  if (!product) {
    // 404 Not Found 에러
    throw ApiError.notFound("상품을 찾을 수 없습니다.");
  }

  // 200 OK 상태 코드
  res.status(200).json(product);
});

/**
 * [PATCH /api/products/:id]
 * 상품 수정
 */
export const updateProduct = withAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, tags } = req.body;

  // 수정할 데이터만 객체에 포함 (필요한 경우에만 업데이트)
  const dataToUpdate: {
    name?: string;
    description?: string;
    price?: number;
    tags?: any;
  } = {};
  if (name) dataToUpdate.name = name;
  if (description) dataToUpdate.description = description;
  if (price) dataToUpdate.price = Number(price);
  if (tags) dataToUpdate.tags = tags;

  // 수정할 데이터가 없으면 400 에러
  if (Object.keys(dataToUpdate).length === 0) {
    throw ApiError.badRequest("수정할 데이터가 없습니다.");
  }

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data: dataToUpdate,
  });
  // 200 OK 상태 코드
  res.status(200).json(updatedProduct);
});

/**
 * [DELETE /api/products/:id]
 * 상품 삭제
 */
export const deleteProduct = withAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  // 상품 삭제
  await prisma.product.delete({
    where: { id: Number(id) },
  });
  // 204 No Content 상태 코드
  res.status(204).send();
});
