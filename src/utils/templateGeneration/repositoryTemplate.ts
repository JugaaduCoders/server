export function repositoryTemplate(folderName: string, capitalized: string) {
  return `import { eq } from 'drizzle-orm';
    import { db } from '../../db';
    import { ${folderName} } from '../../db/schema/${folderName}';
    import { Get${capitalized}DTO } from './${folderName}DTO';

    export async function get${capitalized}ById(
      dto: Get${capitalized}DTO
    ) {
      return await db.query.${folderName}.findFirst({
        where: eq(${folderName}.id, Number(dto.id)),
      });
    }
    `;
}
