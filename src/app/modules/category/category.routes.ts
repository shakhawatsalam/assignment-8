import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.get('/', CategoryController.getAllBooksFromDB);
router.get('/:id', CategoryController.getSingleBooksFromDB);
router.post(
  '/create-category',
  validateRequest(CategoryValidation.create),
  CategoryController.insertIntoDB
);

router.patch(
  '/:id',
  validateRequest(CategoryValidation.update),
  CategoryController.updateSingleBooksFromDB
);
router.delete('/:id', CategoryController.deleteSingleBooksFromDB);

export const CategoryRoutes = router;
