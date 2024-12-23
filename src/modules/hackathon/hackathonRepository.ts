import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { hackathon } from '../../db/schema/hackathon';
import { CreateHackathonDTO, GeHackathonDTO } from './hackathonDTO';

export function getHackathonById(dto: GeHackathonDTO) {
  return db.query.hackathon.findFirst({
    where: eq(hackathon.id, Number(dto.id)),
  });
}

export function getHackathons() {
  return db.query.hackathon.findMany();
}

export function createHackathon(dto: CreateHackathonDTO) {
  return db.insert(hackathon).values(dto);
}
