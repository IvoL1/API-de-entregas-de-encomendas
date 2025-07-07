import type { Request, Response } from 'express';
import z from 'zod';
import { prisma } from '../database/prisma';

class DeliveryStatusController {
  async update(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      status: z.enum(['processing', 'shipped', 'delivered']),
    });

    const { id } = paramsSchema.parse(req.params);
    const { status } = bodySchema.parse(req.body);

    await prisma.delivery.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });

    await prisma.deliveryHistory.create({
      data: {
        deliveryId: id,
        description: status,
      },
    });

    res.json({
      success: true,
      message: 'Delivery Status Updated.',
    });
  }
}

export default new DeliveryStatusController();
