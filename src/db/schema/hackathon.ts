import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  smallint,
  varchar,
} from 'drizzle-orm/pg-core';
import { hackathonParticipant } from './hackathonParticipant';
import { timestamps } from './schema.helper';
import { user } from './user';

// we used date() instead of timestamp() because we are implementing linear time for starting, ending and registration of a hackathon
export const hackathon = pgTable('Hackathons', {
  id: serial().primaryKey(),
  createdBy: integer().references(() => user.id),
  name: varchar({ length: 255 }).notNull(),
  registrationDeadline: date().notNull(),
  startDate: date().notNull(),
  endDate: date().notNull(),
  isPublic: boolean().default(true),
  maxTeamSize: smallint(),
  ...timestamps,
});

export const hackathonRelations = relations(hackathon, ({ one, many }) => ({
  user: one(user, {
    fields: [hackathon.createdBy],
    references: [user.id],
  }),
  hackathonParticipant: many(hackathonParticipant),
}));
