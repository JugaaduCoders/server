export function serviceTemplate(folderName: string, capitalized: string) {
  return `
    import { Get${capitalized}DCO } from './${folderName}DCO';
    import { Get${capitalized}DTO } from './${folderName}DTO';
    import * as ${folderName}Repository from './${folderName}Repository';
    
    export function get${capitalized}ById(dto: Get${capitalized}DTO): Promise<Get${capitalized}DCO | undefined> {
      return ${folderName}Repository.get${capitalized}ById(dto);
    }`;
}
