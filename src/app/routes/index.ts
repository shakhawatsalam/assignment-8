import express from 'express';
import { AuthRouter } from '../modules/auth/auth.routes';
import { BookRouter } from '../modules/book/book.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { ReviewAndRating } from '../modules/reviewAndRating/reviewAndRating.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/books',
    route: BookRouter,
  },
  {
    path: '/reviewandrating',
    route: ReviewAndRating,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
