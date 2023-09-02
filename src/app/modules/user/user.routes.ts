import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', UserController.getAllUserFromDB);
router.get('/:id', UserController.getSingleUserFromDB);

router.patch(
  '/:id',
  validateRequest(UserValidation.update),
  UserController.updateSingleUserFromDB
);
router.delete('/:id', UserController.deleteSingleUserFromDB);

export const UserRoutes = router;
