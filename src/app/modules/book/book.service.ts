/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IBookFilterRequest } from './book.interface';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};
const getAllBookFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andCondition = [];

  // Add minPrice and maxPrice conditions if provided
  if (parseFloat(minPrice as string)) {
    andCondition.push({
      price: {
        gte: parseFloat(minPrice as string),
      },
    });
  }
  // Max Price
  if (parseFloat(maxPrice as string)) {
    andCondition.push({
      price: {
        lte: parseFloat(maxPrice as string),
      },
    });
  }

  if (searchTerm) {
    andCondition.push({
      OR: ['title', 'genre', 'author'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereCondition: Prisma.BookWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.book.count({
    where: whereCondition,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getSingleBookFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return result;
};
const getByCategoryIDFromDB = async (
  categoryId: string
): Promise<Book[] | null> => {
  const result = await prisma.book.findMany({
    where: {
      category: {
        id: categoryId,
      },
    },
    include: {
      category: true,
    },
  });

  return result;
};
const updateSingleBookFromDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};
const deleteSingleBookFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return result;
};

export const BookService = {
  insertIntoDB,
  getAllBookFromDB,
  getSingleBookFromDB,
  updateSingleBookFromDB,
  getByCategoryIDFromDB,
  deleteSingleBookFromDB,
};
