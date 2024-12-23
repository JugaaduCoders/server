import FormData from 'form-data';
import { uploadToImgBB } from '../../utils/uploadImage';
import { GetHackathonDCO } from './hackathonDCO';
import { CreateHackathonDTO, GeHackathonDTO } from './hackathonDTO';
import * as hackathonRepository from './hackathonRepository';

export function getHackathons(): Promise<GetHackathonDCO[]> {
  return hackathonRepository.getHackathons();
}

export function getHackathonById(
  dto: GeHackathonDTO
): Promise<GetHackathonDCO | undefined> {
  return hackathonRepository.getHackathonById(dto);
}

export async function createHackathon(
  dto: CreateHackathonDTO,
  file: Express.Multer.File | undefined
) {
  let imageURL: string | undefined = undefined;
  if (file) {
    const formData = new FormData();
    formData.append('image', file.buffer, { filename: file.originalname });

    imageURL = await uploadToImgBB(formData);
  }
  return hackathonRepository.createHackathon({ ...dto, imageURL });
}
