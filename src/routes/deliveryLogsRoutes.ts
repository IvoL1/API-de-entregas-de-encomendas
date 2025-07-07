import { Router } from 'express';
import DeliveryLogController from '../controllers/DeliveryLogController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { verifyMiddleware } from '../middlewares/verify.middleware';

export const deliveryLogsRoutes = Router();

deliveryLogsRoutes.post(
  '/',
  authMiddleware,
  verifyMiddleware(['sale']),
  DeliveryLogController.create
);

deliveryLogsRoutes.get(
  '/:delivery_id/show',
  authMiddleware,
  verifyMiddleware(['customer', 'sale']),
  DeliveryLogController.show
);
