import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../types/types";
import { verifyToken } from "./jwt";
import { createUnauthenticated, createUnauthorized } from "./response";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return createUnauthenticated(res, "Verification token not found", "");
  }

  try {
    const decode = verifyToken(token);
    req.user = decode;
    next();
  } catch (error: ErrorType) {
    return createUnauthorized(res, (error as Error).message, "");
  }
};

module.exports = authMiddleware;
