import { z } from 'zod';

export const UserSignUpDTOSchema = z.array(
  z.object({
    firstName: z.string().min(1).max(255),
    lastName: z.string().max(255).nullable(),
    email: z.string().email(),
    password: z.string().nullable(),
    role: z
      .enum([UserRoleEnum.ADMIN, UserRoleEnum.PARTICIPANT, UserRoleEnum.USER])
      .default(UserRoleEnum.PARTICIPANT),
  })
);
export type UserSignUpDTO = z.infer<typeof UserSignUpDTOSchema>;

export const GetUserDTOSchema = z.object({
  id: z.coerce.number(),
});
export type GetUserDTO = z.infer<typeof GetUserDTOSchema>;
