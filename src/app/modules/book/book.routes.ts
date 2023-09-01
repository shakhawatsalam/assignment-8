import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();
router.get('/', BookController.getAllBookFromDB);
router.get('/:id', BookController.getSingleBookFromDB);
router.post(
  '/create-book',
  validateRequest(BookValidation.create),
  BookController.insertIntoDB
);
router.patch(
  '/:id',
  validateRequest(BookValidation.update),
  BookController.updateSingleBookFromDB
);
router.delete('/:id', BookController.deleteSingleBookFromDB);
export const BookRouter = router;
