import { Router } from 'express';
import DeliveryController from '../controllers/DeliveryController';
import DeliveryStatusController from '../controllers/DeliveryStatusController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { verifyMiddleware } from '../middlewares/verify.middleware';

export const deliveryRoutes = Router();

deliveryRoutes.use(authMiddleware, verifyMiddleware(['sale']));

deliveryRoutes.post('/', DeliveryController.create);

deliveryRoutes.get('/', DeliveryController.index);

deliveryRoutes.patch('/:id/status', DeliveryStatusController.update);
