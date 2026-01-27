import { Product } from '@prisma/client';
import prisma from '../lib/prisma-client.js';
import { PagePaginationParams } from '../types/pagination.js';

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.product.create({
    data,
  });
}

export async function getProduct(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
}

export async function getProductWithFavorites(id: number, userId?: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { productLike: true },
  });
  if (!product) {
    return null;
  }

  const mappedProduct = {
    ...product,
    productLike: undefined,
    favoriteCount: product.productLike.length,
    isFavorited: userId
      ? product.productLike.some((like) => like.userId === userId)
      : undefined,
  };
  return mappedProduct;
}

export async function getProductListWithFavorites(
  { page, pageSize, orderBy, keyword }: PagePaginationParams,
  {
    userId,
  }: {
    userId?: number;
  } = {},
) {
  const where = keyword
    ? {
        OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
      }
    : {};

  const totalCount = await prisma.product.count({
    where,
  });

  const products = await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: orderBy === 'recent' ? { id: 'desc' } : { id: 'asc' },
    where,
    include: {
      productLike: true,
    },
  });

  const mappedProducts = products.map((product) => ({
    ...product,
    productLike: undefined,
    favoriteCount: product.productLike.length,
    isFavorited:
      userId !== undefined
        ? product.productLike.some((like) => like.userId === userId)
        : undefined,
  }));

  return {
    list: mappedProducts,
    totalCount,
  };
}

export async function getFavoriteProductListByOwnerId(
  ownerId: number,
  { page, pageSize, orderBy, keyword }: PagePaginationParams,
) {
  const where = keyword
    ? {
        OR: [{ name: { contains: keyword } }, { description: { contains: keyword } }],
      }
    : {};
  const totalCount = await prisma.product.count({
    where: {
      ...where,
      productLike: {
        some: {
          userId: ownerId,
        },
      },
    },
  });
  const products = await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: orderBy === 'recent' ? { id: 'desc' } : { id: 'asc' },
    where: {
      ...where,
      productLike: {
        some: {
          userId: ownerId,
        },
      },
    },
    include: {
      productLike: true,
    },
  });

  const mappedProducts = products.map((product) => ({
    ...product,
    productLike: undefined,
    favoriteCount: product.productLike.length,
    isFavorited: true,
  }));

  return {
    list: mappedProducts,
    totalCount,
  };
}

export async function updateProductWithFavorites(id: number, data: Partial<Product>) {
  const product = await prisma.product.update({
    where: { id },
    data,
    include: {
      productLike: true,
    },
  });
  const mappedProduct = {
    ...product,
    productLike: undefined,
    favoriteCount: product.productLike.length,
    isFavorited: undefined
  };
  return mappedProduct;
}

export async function deleteProduct(id: number) {.
  return prisma.product.delete({
    where: { id },
  });
}
