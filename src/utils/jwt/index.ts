import jwt from "jsonwebtoken";
import { ErrorType } from "../../types";
import { serverLog } from "../logs";

export function generateToken(user: User) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const options = {
    expiresIn: "7d",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export function verifyToken(token: string): User {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode as User;
  } catch (error: ErrorType) {
    serverLog(error);
    throw new Error("Invalid or expired token");
  }
}
