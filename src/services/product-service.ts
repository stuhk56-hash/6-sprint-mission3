// src/services/productService.js

const { prisma } = require('../../prisma/client');

// 상품 등록
type CreateProductInput = {
  name: string;
  description?: string;
  price: number | string;
  tags?: string[];
  imagePath?: string;
};

export const createProduct = async ({
  name,
  description,
  price,
  tags,
  imagePath,
}: CreateProductInput) => {
  return prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      tags,
      imagePath,
    },
  });
};

// 상품 상세 조회
export const getProduct = async (id: number | string) => {
  return prisma.product.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      imagePath: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// 상품 수정
type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number | string;
  tags?: string[];
  imagePath?: string;
};

export const updateProduct = async (
  id: number | string,
  input: UpdateProductInput
) => {
  const data = Object.fromEntries(
    Object.entries(input).filter(([_, v]) => v !== undefined)
  );

  if (data.price !== undefined) {
    data.price = Number(data.price);
  }

  return prisma.product.update({
    where: { id: Number(id) },
    data,
  });
};

// 상품 삭제
export const deleteProduct = async (id: number | string): Promise<boolean> => {
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    return true;
  } catch {
    return false;
  }
};

// 상품 목록 (offset, 최신순, 검색 지원)
type ListProductsInput = {
  offset?: number | string;
  limit?: number | string;
  order?: 'asc' | 'desc';
  search?: string;
};

export const listProducts = async ({
  offset = 0,
  limit = 10,
  order = 'desc',
  search = '',
}: ListProductsInput) => {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }
    : undefined;

  return prisma.product.findMany({
    where,
    orderBy: { createdAt: order },
    skip: Number(offset),
    take: Number(limit),
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
    },
  });
};
 