import type { Request, Response } from 'express';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';

class UserController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(3, 'Name must be at least 3 characters'),
      email: z.string().email('Invalid email format'),
      password: z
        .string()
        .min(8)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
          // {
          //   message: 'Password creation failed - please try again',
          // }
        ),
    });

    const { name, email, password } = bodySchema.parse(req.body);

    const hasEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (hasEmail) {
      throw new AppError('E-mail already exists.');
    }

    const hashPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
      omit: { password: true, updatedAt: true, createdAt: true },
    });

    res.status(201).json(user);
  }
}

export default new UserController();
