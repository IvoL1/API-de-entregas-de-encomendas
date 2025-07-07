import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { authRoutes } from './authRoutes';
import { deliveryRoutes } from './deliveryRoutes';
import { deliveryLogsRoutes } from './deliveryLogsRoutes';

export const router = Router();

router.use('/user', userRoutes);
router.use('/login', authRoutes);
router.use('/delivery', deliveryRoutes);
router.use('/delivery-logs', deliveryLogsRoutes);
