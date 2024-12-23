export function controllerTemplate(folderName: string, capitalized: string) {
  return `import { Request, Response } from 'express';
import * as httpRequest from '../../utils/response';
import * as ${folderName}Service from './${folderName}Service';
import { Get${capitalized}DTOSchema } from './${folderName}DTO';


export async function get${capitalized}ById(request: Request, response: Response) {
    const callee = get${capitalized}ById.name;

    try {
        const dto = Get${capitalized}DTOSchema.parse({ id: request.query.id });
        const payload = await ${folderName}Service.get${capitalized}ById(dto);
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
`;
}
