import { z } from 'zod';
import { UserRoleEnum } from '../../types';

/* ----------------- Schema ---------------- */

export const UserLoginDTOSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UserSignUpDTOSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().max(255).optional(),
  email: z.string().email(),
  password: z.string().optional(),
  role: z
    .enum([UserRoleEnum.ADMIN, UserRoleEnum.PARTICIPANT, UserRoleEnum.USER])
    .default(UserRoleEnum.PARTICIPANT),
});

/* ----------------- DTOs ---------------- */

export type UserLoginDTO = z.infer<typeof UserLoginDTOSchema>;

export type UserSignUpDTO = z.infer<typeof UserSignUpDTOSchema>;