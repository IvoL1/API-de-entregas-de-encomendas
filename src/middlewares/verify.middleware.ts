import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function verifyMiddleware(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Authentication required', 401);
    }
    if (!role.includes(req.user.role)) {
      throw new AppError('Unauthorized access', 403);
    }
    return next();
  };
}
