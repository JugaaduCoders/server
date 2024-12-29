import { NextFunction, Request, Response } from 'express';
import { redis } from '../services/redisService';
import { verifyToken } from './jwt';
import { createUnauthenticated, createUnauthorized } from './response';

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
    const tokenUser = verifyToken(val2);
    const userData = await redis.redisClient.get(token);
    const user = JSON.parse(userData ?? '{}');
    if (!userData && !tokenUser) {
      return createUnauthenticated(
        res,
        '',
        'Verification token is expired or invalid'
      );
    }
    req.user = user.id ?? tokenUser;
    next();
  } catch (error: Error | unknown) {
    return createUnauthorized(res, (error as Error).message, '');
  }
};
