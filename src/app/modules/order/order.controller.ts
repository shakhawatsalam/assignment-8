import { Request, Response } from 'express';
import httpStatus from 'http-status';
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
  const result = await OrderService.getAllOrder();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Fetched Successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const result = await OrderService.getSingleOrder(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Fetched Successfully',
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllOrder,
  getSingleOrder,
};
