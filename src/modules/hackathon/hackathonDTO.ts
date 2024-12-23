import { z } from 'zod';

/* ----------------- Schema ---------------- */

export const GeHackathonDTOSchema = z.object({
  id: z.coerce.number(),
});

export const CreateHackathonDTOSchema = z.object({
  createdBy: z.number().int().positive(),
  name: z.string().min(1).max(255),
  registrationDeadline: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid registration deadline date',
  }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date',
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date',
  }),
  isPublic: z.boolean().optional().default(true),
  maxTeamSize: z.number().int().positive().max(12).optional(),
  imageURL: z.string().url().optional(),
});
/* ----------------- DTOs ---------------- */

export type GeHackathonDTO = z.infer<typeof GeHackathonDTOSchema>;

export type CreateHackathonDTO = z.infer<typeof CreateHackathonDTOSchema>;
