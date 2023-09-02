import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};
const getAllBookFromDB = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  });

  return result;
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
