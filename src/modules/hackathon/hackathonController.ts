import { Request, Response } from 'express';
import * as httpRequest from '../../utils/response';
import { GeHackathonDTOSchema } from './hackathonDTO';
import * as HackathonService from './hackathonService';

export async function getHackathonById(request: Request, response: Response) {
  const callee = getHackathonById.name;
  const { id } = request.params;
  try {
    const dto = GeHackathonDTOSchema.parse({ id });
    const payload = await HackathonService.getHackathonById(dto);
    return httpRequest.createSuccess(
      response,
      'Successfully fetched',
      payload,
      callee
    );
  } catch (err: Error | unknown) {
    return httpRequest.defaultErrorHandler(response, err, callee);
  }
}

export async function getHackathons(request: Request, response: Response) {
  const callee = getHackathons.name;
  try {
    const payload = await HackathonService.getHackathons();
    return httpRequest.createSuccess(
      response,
      'Successfully fetched',
      payload,
      callee
    );
  } catch (err: Error | unknown) {
    return httpRequest.defaultErrorHandler(response, err, callee);
  }
}
