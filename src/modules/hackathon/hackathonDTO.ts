import { z } from 'zod';

/* ----------------- Schema ---------------- */

export const GeHackathonDTOSchema = z.object({
  id: z.coerce.number(),
});

export const CreateHackathonDTOSchema = z.object({
  createdBy: z.number().int().positive(),
  name: z.string().min(1).max(255),
  registrationDeadline: z.coerce.date(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isPublic: z.boolean().optional().default(true),
  maxTeamSize: z.number().int().positive().max(12).optional(),
  imageURL: z.string().url().optional(),
  requirements: z.string(),
  themes: z.string().optional(),
  prizes: z.string().optional(),
  overview: z.string(),
});
/* ----------------- DTOs ---------------- */

export type GeHackathonDTO = z.infer<typeof GeHackathonDTOSchema>;

export type CreateHackathonDTO = z.infer<typeof CreateHackathonDTOSchema>;
