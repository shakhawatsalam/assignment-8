import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Inserted Successfully',
    data: result,
  });
});
const getAllBookFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBookFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Inserted Successfully',
    data: result,
  });
});
const getSingleBookFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBookFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Inserted Successfully',
    data: result,
  });
});
const getByCategoryIDFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const result = await BookService.getByCategoryIDFromDB(categoryId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book Inserted Successfully',
      data: result,
    });
  }
);
const updateSingleBookFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await BookService.updateSingleBookFromDB(id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book Inserted Successfully',
      data: result,
    });
  }
);
const deleteSingleBookFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.deleteSingleBookFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book Inserted Successfully',
      data: result,
    });
  }
);

export const BookController = {
  insertIntoDB,
  getAllBookFromDB,
  getSingleBookFromDB,
  getByCategoryIDFromDB,
  updateSingleBookFromDB,
  deleteSingleBookFromDB,
};
