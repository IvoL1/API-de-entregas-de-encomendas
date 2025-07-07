import type { Request, Response } from 'express';
import z from 'zod';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';
import { date } from 'zod/v4';

class DeliveryLogController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = bodySchema.parse(req.body);

    const hasDeliveryId = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    if (!hasDeliveryId) {
      throw new AppError('Delivery ID not found', 404);
    }

    if (hasDeliveryId.status === 'delivered') {
      throw new AppError('This order already delivered ', 404);
    }

    if (hasDeliveryId.status === 'processing') {
      throw new AppError('Changed status to shipped');
    }

    await prisma.deliveryHistory.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    res
      .status(201)
      .json({ success: true, message: 'Delivery History Created.' });
  }

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(req.params);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
        id: true,
      },
      include: {
        user: { select: { name: true, email: true } },
        logs: { select: { description: true, createdAt: true } },
      },
    });

    if (!delivery) {
      throw new AppError('Delivered not found.', 404);
    }

    if (req.user?.role === 'customer' && req.user.id !== delivery?.userId) {
      throw new AppError('Access denied.', 401);
    }

    res.json({ success: true, delivery });
  }
}

export default new DeliveryLogController();
