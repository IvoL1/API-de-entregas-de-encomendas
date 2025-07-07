import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Validation Error',
      issues: err.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }
  res.status(500).json({ message: err });
}
