import { ReviewAndRating } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (payload: ReviewAndRating) => {
  const result = await prisma.reviewAndRating.create({
    data: payload,
  });
  return result;
};

const getAllReview = async (): Promise<ReviewAndRating[] | null> => {
  const result = await prisma.reviewAndRating.findMany({});
  return result;
};
const getSingleReview = async (id: string): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const updateSingleReview = async (
  id: string,
  payload: Partial<ReviewAndRating>
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteSingleReview = async (
  id: string
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ReviewAndRatingService = {
  insertIntoDb,
  getAllReview,
  getSingleReview,
  deleteSingleReview,
  updateSingleReview,
};
