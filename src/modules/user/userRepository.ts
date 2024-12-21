import { eq } from "drizzle-orm";
import { chunk } from "lodash";
import { db } from "../../db";
import { user } from "../../db/schema/user";
import { CHUNK_SIZE } from "../constants";
import { UserSignUpDTO } from "./userDto";

export async function getUser(dto: { id: string }) {
  // const u = await db.select().from(user).where(eq(user.id, +dto.id));
  const u = await db.query.user.findFirst({
    where: eq(user.id, Number(dto.id)),
  });
  console.log(u);
  return u;
}

export async function createUsers(dto: UserSignUpDTO) {
  const chunks: UserSignUpDTO[] = chunk(dto, CHUNK_SIZE);
  await db.transaction(async (tx) => {
    await Promise.all(
      chunks.map(async (userChunk) => {
        await tx
          .insert(user)
          .values(userChunk as unknown as typeof user.$inferInsert)
          .execute();

      })
    );
  });
  
}