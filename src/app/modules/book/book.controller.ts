import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
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
  const filter = pick(req.query, [
    'searchTerm',
    'title',
    'author',
    'genre',
    'maxPrice',
    'minPrice',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllBookFromDB(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleBookFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBookFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book Fetched Successfully',
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
      message: 'Book Fetched By Category Successfully',
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
      message: 'Book Updated Successfully',
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
      message: 'Book Deleted Successfully',
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
