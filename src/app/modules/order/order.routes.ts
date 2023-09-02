import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.get('/', OrderController.getAllOrder);
router.get('/:orderId', OrderController.getSingleOrder);
router.post('/create-order', OrderController.insertIntoDB);
export const OrderRoutes = router;
