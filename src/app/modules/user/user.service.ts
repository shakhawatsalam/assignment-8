import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const getAllUserFromDB = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany({});
  return result;
};
const getSingleUserFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSingleUserFromDB = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteSingleUserFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  insertIntoDB,
  getAllUserFromDB,
  updateSingleUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
};
