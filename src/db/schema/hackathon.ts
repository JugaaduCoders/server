import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { hackathonParticipant } from './hackathonParticipant';
import { timestamps } from './schema.helper';
import { user } from './user';

export const hackathon = pgTable('Hackathons', {
  id: serial().primaryKey(),
  createdBy: integer().references(() => user.id),
  name: varchar({ length: 255 }).notNull(),
  registrationDeadline: timestamp().notNull(),
  startDate: timestamp().notNull(),
  endDate: timestamp().notNull(),
  isPublic: boolean().default(true),
  maxTeamSize: smallint(),
  imageUrl: text(),
  overview: text(),
  requirements: text().notNull(),
  themes: text(),
  prizes: text(),
  ...timestamps,
});

export const hackathonRelations = relations(hackathon, ({ one, many }) => ({
  user: one(user, {
    fields: [hackathon.createdBy],
    references: [user.id],
  }),
  hackathonParticipant: many(hackathonParticipant),
}));
