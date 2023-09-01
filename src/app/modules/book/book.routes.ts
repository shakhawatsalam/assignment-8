import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();
router.get('/', BookController.getAllBookFromDB);
router.get('/:id', BookController.getSingleBookFromDB);
router.post('/create-book', BookController.insertIntoDB);
router.patch('/:id', BookController.updateSingleBookFromDB);
router.delete('/:id', BookController.deleteSingleBookFromDB);
export const BookRouter = router;
