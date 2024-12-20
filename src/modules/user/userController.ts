import { Request, Response } from 'express';
import * as httpRequest from '../../utils/response';
import { GetUserDTOSchema, UserSignUpDTOSchema } from './userDTO';
import * as userService from './userService';

export async function getUser(request: Request, response: Response) {
  const callee = getUser.name;
  const { id } = request.params;
  try {
    const dto = GetUserDTOSchema.parse({ id });
    const payload = await userService.getUser(dto);

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
    userService.userSignUp(dto);
    return httpRequest.createCreated(response, message, '', callee);
  } catch (err: Error | unknown) {
    return httpRequest.defaultErrorHandler(response, err, callee);
  }
}
