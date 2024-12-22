import { z } from 'zod';
import { UserRoleEnum } from '../../types';

/* ----------------- Schema ---------------- */

export const UserSignUpDTOSchema = z.array(
  z.object({
    firstName: z.string().min(1).max(255),
    lastName: z.string().max(255).optional(),
    email: z.string().email(),
    password: z.string().optional(),
    role: z
      .enum([UserRoleEnum.ADMIN, UserRoleEnum.PARTICIPANT, UserRoleEnum.USER])
      .default(UserRoleEnum.PARTICIPANT),
  })
);

export const GetUserDTOSchema = z.object({
  id: z.coerce.number(),
});

/* ----------------- DTOs ---------------- */

export type UserSignUpDTO = z.infer<typeof UserSignUpDTOSchema>;

export type GetUserDTO = z.infer<typeof GetUserDTOSchema>;
