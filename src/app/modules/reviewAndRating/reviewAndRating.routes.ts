import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewAndRatingController } from './reviewAndRating.controller';
import { ReviewAndRatingValidation } from './reviewAndRating.validation';

const router = express.Router();
router.get('/', ReviewAndRatingController.getAllReview);
router.get('/:id', ReviewAndRatingController.getSingleReview);
router.post(
  '/',
  validateRequest(ReviewAndRatingValidation.create),
  ReviewAndRatingController.insertIntoDb
);
router.patch(
  '/:id',
  validateRequest(ReviewAndRatingValidation.update),
  ReviewAndRatingController.updateSingleReview
);
router.delete('/:id', ReviewAndRatingController.deleteSingleReview);
export const ReviewAndRating = router;
