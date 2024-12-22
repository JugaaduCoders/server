import { CustomError } from '../../utils/error/CustomError';
import { hashing } from '../../utils/hashPassword';
import { generateToken } from '../../utils/jwt';
import { UserLoginDCO } from './authDCO';
import { UserLoginDTO, UserSignUpDTO } from './authDTO';
import * as authRepository from './authRepository';

export async function userLogin(dto: UserLoginDTO): Promise<UserLoginDCO> {
  const user = await authRepository.userLogin({
    ...dto,
  });

  if (user) {
    const isCorrectPass = hashing.verifyPassword(
      dto.password,
      user.password ?? ''
    );
    if (isCorrectPass) {
      const authToken = generateToken(user);
      return { user, authToken };
    }
    throw new CustomError('Incorrect Password, please try again');
  }
  throw new CustomError('The Email may not register with us');
}

export async function userSignup(dto: UserSignUpDTO): Promise<UserLoginDCO> {
  const encryptedPassword = dto.password
    ? hashing.createHashPassword(dto.password)
    : undefined;
  const user = await authRepository.userSignup({
    ...dto,
    password: encryptedPassword,
  });
  const authToken = generateToken(user[0]);
  return { user: user[0], authToken };
}
