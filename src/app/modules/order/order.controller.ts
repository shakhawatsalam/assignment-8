import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await OrderService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { userId, role } = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as Secret
  );
  const result = await OrderService.getAllOrder(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Fetched Successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const token = req.headers.authorization;
  const { userId, role } = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as Secret
  );
  const result = await OrderService.getSingleOrder(orderId, userId, role);
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not Allow to watch this order'
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Fetched Successfully',
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllOrder,
  getSingleOrder,
};
