import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllBooksFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({});
  return result;
};
const getSingleBooksFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const updateSingleBooksFromDB = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteSingleBooksFromDB = async (
  id: string
): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllBooksFromDB,
  getSingleBooksFromDB,
  updateSingleBooksFromDB,
  deleteSingleBooksFromDB,
};
