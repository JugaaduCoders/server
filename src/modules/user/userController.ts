import { Request, Response } from "express";
import * as userService from "./userService";
import * as httpRequest from "../../utils/response";
import { UserSignUpDTOSchema } from "./userDto";

export async function getUser(request: Request, response: Response) {
  const callee = getUser.name;
  const { id } = request.params;
  const dto = { id: id };
  try {
    const payload = await userService.getUser(dto);

    return httpRequest.createSuccess(
      response,
      "Successfully fetched",
      payload,
      callee
    );
  } catch (err: Error | unknown) {
    return httpRequest.defaultErrorHandler(response, err, callee);
  }
}

export async function createUsers(request: Request, response: Response) {
  const callee = createUsers.name;
  const users = request.body;

  try {
    const dto = UserSignUpDTOSchema.parse(users);
    const message = `${dto.length === 1 ? "User" : "Users"} registered successfully!`;
    userService.createUser(dto);
    console.log("msg = ", message);
    return httpRequest.createNoContent(response, message, callee);
  } catch (err: Error | unknown) {
    return httpRequest.defaultErrorHandler(response, err, callee);
  }
}
