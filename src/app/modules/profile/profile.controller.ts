import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { userId } = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as Secret
  );
  const result = await ProfileService.getProfile(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Fetched Successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
};
