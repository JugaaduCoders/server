import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt";
import { createUnauthenticated, createUnauthorized } from "./response";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return createUnauthenticated(res, "", "Verification token not found");
  }

  try {
    const decode = verifyToken(token);
    req.user = decode;
    next();
  } catch (error: Error | unknown) {
    return createUnauthorized(res, (error as Error).message, "");
  }
};
