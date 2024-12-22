import { Request, Response } from 'express';
import {
  createAccepted,
  createSuccess,
  defaultErrorHandler,
} from '../../utils/response';
import { UserLoginDTOSchema, UserSignUpDTOSchema } from './authDTO';
import * as authService from './authService';

export async function userLogin(req: Request, res: Response) {
  const callee = userLogin.name;
  try {
    const dto = UserLoginDTOSchema.parse({
      ...req.body,
    });
    const data = await authService.userLogin(dto);
    return createSuccess(res, 'Logged In Successfully', data, callee);
  } catch (e: Error | unknown) {
    return defaultErrorHandler(res, e, callee);
  }
}

export async function userSignup(req: Request, res: Response) {
  const callee = userLogin.name;
  try {
    const dto = UserSignUpDTOSchema.parse({
      ...req.body,
    });
    const data = await authService.userSignup(dto);
    return createAccepted(res, 'Signed up In Successfully', data, callee);
  } catch (e: Error | unknown) {
    return defaultErrorHandler(res, e, callee);
  }
}
