import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { hackathon } from './hackathon';
import { hackathonParticipant } from './hackathonParticipant';
import { timestamps } from './schema.helper';
import { teamMember } from './teamMember';

export const rolesEnum = pgEnum('roles', ['participant', 'user', 'admin']);

export const user = pgTable('Users', {
  id: serial().primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  role: rolesEnum().notNull(),
  ...timestamps,
});

export const userRelations = relations(user, ({ many }) => ({
  hackathon: many(hackathon),
  hackathonParticipant: many(hackathonParticipant),
  teamMember: many(teamMember),
}));
