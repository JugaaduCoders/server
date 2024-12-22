import { GetUserDCO } from './userDCO';
import { GetUserDTO, UserSignUpDTO } from './userDTO';
import * as userRepository from './userRepository';

export function getUser(dto: GetUserDTO): Promise<GetUserDCO | undefined> {
  return userRepository.getUser(dto);
}

export function userSignUp(dto: UserSignUpDTO) {
  return userRepository.userSignUp(dto);
}
