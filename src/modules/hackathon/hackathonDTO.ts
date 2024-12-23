import { z } from 'zod';

/* ----------------- Schema ---------------- */

export const GeHackathonDTOSchema = z.object({
  id: z.coerce.number(),
});

/* ----------------- DTOs ---------------- */

export type GeHackathonDTO = z.infer<typeof GeHackathonDTOSchema>;
