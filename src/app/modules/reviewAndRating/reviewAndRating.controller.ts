import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewAndRatingService } from './reviewAndRating.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewAndRatingService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review and Rating is Created',
    data: result,
  });
});

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewAndRatingService.getAllReview();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Review Fetched Successfully',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewAndRatingService.getSingleReview(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Fetched Successfully',
    data: result,
  });
});

const updateSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await ReviewAndRatingService.updateSingleReview(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Updated  Successfully',
    data: result,
  });
});
const deleteSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewAndRatingService.deleteSingleReview(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted Successfully',
    data: result,
  });
});

export const ReviewAndRatingController = {
  insertIntoDb,
  getAllReview,
  getSingleReview,
  deleteSingleReview,
  updateSingleReview,
};
