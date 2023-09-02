import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser } from './auth.interface';

const SignUP = async (data: User) => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<string> => {
  const { email, password } = payload;
  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  // create assess token
  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return accessToken;
};

export const AuthService = {
  SignUP,
  loginUser,
};
