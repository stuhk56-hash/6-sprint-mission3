import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Fetch paginated results from a specified model.
 *
 * @param {string} model - The Prisma model name to query.
 * @param {number} page - The current page number (1-indexed).
 * @param {number} pageSize - The number of items per page.
 * @param {object} [filters={}] - Optional filters to apply to the query.
 * @returns {Promise<object>} - An object containing paginated results and metadata.
 */
export async function fetchPaginatedResults(model, page, pageSize, filters = {}) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [totalCount, results] = await Promise.all([
    prisma[model].count({ where: filters }),
    prisma[model].findMany({
      where: filters,
      skip,
      take,
    }),
  ]);

  const totalPages = Math.ceil(totalCount   / pageSize);

  return {
    results,
    meta: {
      totalCount,
      totalPages,
      currentPage: page,
      pageSize,
    },
  };
}   


