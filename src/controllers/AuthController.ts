import type { Request, Response } from 'express';
import z from 'zod';
import { compare } from 'bcrypt';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';
import { authConfig } from '../configs/auth.config';
import jwt from 'jsonwebtoken';

class AuthController {
  async create(req: Request, res: Response) {
    const userLoginSchema = z.object({
      email: z.string().email('Invalid email format'),
      password: z
        .string()
        .min(8)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          {
            message:
              'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
          }
        ),
    });

    const { email, password } = userLoginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid Email or Password.');
    }

    const passwordData = await compare(password, user.password);

    if (!passwordData) {
      throw new AppError('Invalid Email or Password.');
    }

    const token = jwt.sign(
      { role: user.role, userId: user.id },
      authConfig.secret
    );

    const { password: hashPassword, ...userData } = user;

    res.json({ token, ...userData });
  }
}

export default new AuthController();
