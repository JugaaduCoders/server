export function dtoTemplate(capitalized: string) {
  return `import { z } from 'zod';

  /* ----------------- Schema ---------------- */

  export const Get${capitalized}DTOSchema = z.object({
    id: z.coerce.number(),
  });

  /* ----------------- DTO ---------------- */
  export type Get${capitalized}DTO = z.infer<typeof Get${capitalized}DTOSchema>;
  `;
}
