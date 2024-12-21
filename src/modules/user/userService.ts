import { UserSignUpDTO } from "./userDto";
import * as userRepository from "./userRepository";

export function getUser(dto: { id: string }) {
  return userRepository.getUser(dto);
}

export function createUser(dto: UserSignUpDTO) {
  userRepository.createUsers(dto);
}
