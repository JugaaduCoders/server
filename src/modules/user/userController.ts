import { Request, Response } from 'express';
import * as httpRequest from '../../utils/response';
import { GetUserDTOSchema, UserSignUpDTOSchema } from './userDTO';
import * as userService from './userService';

export async function getUserById(request: Request, response: Response) {
  const callee = getUserById.name;
  const { id } = request.params;
  try {
    const dto = GetUserDTOSchema.parse({ id });
    const payload = await userService.getUserById(dto);

    return httpRequest.createSuccess(
      response,
      'Successfully fetched',
      payload,
      callee
    );
  } catch (err: Error | unknown) {
    return httpRequest.defaultErrorHandler(response, err, callee);
  }
}

export async function userSignUp(request: Request, response: Response) {
  const callee = userSignUp.name;
  try {
    const dto = UserSignUpDTOSchema.parse(request.body);
    const message = `${dto.length === 1 ? 'User' : 'Users'} registered successfully!`;
    await userService.userSignUp(dto);
    return httpRequest.createCreated(response, message, '', callee);
  } catch (err: Error | unknown) {
    return httpRequest.defaultErrorHandler(response, err, callee);
  }
}
