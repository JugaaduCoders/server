import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './jwt';
import { createUnauthenticated, createUnauthorized } from './response';
import redisClient from '../services/redisService';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization'];

  if (!token) {
    return createUnauthenticated(res, '', 'Verification token not found');
  }
  const [val1, val2] = token.split(' ');

  if (!val1 || !val2) {
    return createUnauthenticated(res, '', 'Verification token not found');
  }

  try {
    const id = verifyToken(val2);
    const userData = await redisClient.get(token);
    const user = JSON.parse(userData ?? '');
    if (!userData || id === user.id) {
      return createUnauthenticated(res, '', 'Verification token not found');
    }
    req.user = user;
    next();
  } catch (error: Error | unknown) {
    return createUnauthorized(res, (error as Error).message, '');
  }
};
