import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getProfile = async (userId: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return result;
};

export const ProfileService = {
  getProfile,
};
