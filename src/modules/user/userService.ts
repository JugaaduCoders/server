import { GetUserDCO } from './userDCO';
import { GetUserDTO, UserSignUpDTO } from './userDTO';
import * as userRepository from './userRepository';

export function getUserById(dto: GetUserDTO): Promise<GetUserDCO | undefined> {
  return userRepository.getUserById(dto);
}

export function userSignUp(dto: UserSignUpDTO) {
  userRepository.userSignUp(dto);
}
