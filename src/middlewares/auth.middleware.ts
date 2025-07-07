import type { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError';
import jwt, { verify } from 'jsonwebtoken';
import { authConfig } from '../configs/auth.config';

interface ITokenPayload {
  role: string;
  userId: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token not found.', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('Token not provided', 401);
  }

  const { role, userId } = verify(token, authConfig.secret) as ITokenPayload;

  req.user = {
    id: userId,
    role,
  };

  next();
}
