import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { user } from '../../db/schema/user';
import { UserLoginDTO, UserSignUpDTO } from './authDTO';

export function userLogin(dto: UserLoginDTO) {
  const { email } = dto;
  return db.query.user.findFirst({
    where: eq(user.email, email),
  });
}

export function userSignup(dto: UserSignUpDTO) {
  return db.insert(user).values(dto).returning();
}
