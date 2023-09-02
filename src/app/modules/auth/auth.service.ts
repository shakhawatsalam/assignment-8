import { User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: User) => {
  const result = await prisma.user.create({
    data,
  });
  const user = await prisma.user.findFirst({
    where: {
      id: result.id,
    },
  });

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: user?.id,
      role: user?.role,
    },

    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    result,
    newAccessToken,
  };
};

export const AuthService = {
  insertIntoDB,
};
