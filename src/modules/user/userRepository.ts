import { eq } from 'drizzle-orm';
import { chunk } from 'lodash';
import { db } from '../../db';
import { user } from '../../db/schema/user';
import { CHUNK_SIZE } from '../constants';
import { GetUserDCO } from './userDCO';
import { GetUserDTO, UserSignUpDTO } from './userDTO';

export async function getUser(
  dto: GetUserDTO
): Promise<GetUserDCO | undefined> {
  return await db.query.user.findFirst({
    where: eq(user.id, Number(dto.id)),
  });
}

export async function userSignUp(dto: UserSignUpDTO) {
  const chunks: UserSignUpDTO[] = chunk(dto, CHUNK_SIZE);
  await db.transaction(async (tx) => {
    await Promise.all(
      chunks.map(async (userChunk) => {
        await tx
          .insert(user)
          .values(userChunk as (typeof user.$inferInsert)[])
          .execute();
      })
    );
  });
}
