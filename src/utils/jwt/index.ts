import jwt from 'jsonwebtoken';
import { serverLog } from '../logs';

export function generateToken(user: User) {
  const options = {
    expiresIn: '7d',
  };
  return jwt.sign(user, process.env.JWT_SECRET, options);
}

export function verifyToken(token: string): User {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode as User;
  } catch (error: Error | unknown) {
    serverLog(error);
    throw new Error('Invalid or expired token');
  }
}
