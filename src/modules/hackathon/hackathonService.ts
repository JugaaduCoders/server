import { GetHackathonDCO } from './hackathonDCO';
import { GeHackathonDTO } from './hackathonDTO';
import * as hackathonRepository from './hackathonRepository';

export function getHackathons(): Promise<GetHackathonDCO[]> {
  return hackathonRepository.getHackathons();
}

export function getHackathonById(
  dto: GeHackathonDTO
): Promise<GetHackathonDCO | undefined> {
  return hackathonRepository.getHackathonById(dto);
}
