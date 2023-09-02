import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();
router.get('/', BookController.getAllBookFromDB);
router.get('/:id', BookController.getSingleBookFromDB);
router.get('/:categoryId/category', BookController.getByCategoryIDFromDB);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.create),
  BookController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookController.updateSingleBookFromDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteSingleBookFromDB
);
export const BookRouter = router;
