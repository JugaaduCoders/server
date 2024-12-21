import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { team } from './team';
import { user } from './user';

export const teamMember = pgTable(
  'TeamMembers',
  {
    teamId: integer().references(() => team.id),
    userId: integer().references(() => user.id),
  },
  (teamMember) => ({
    primaryKey: primaryKey({ columns: [teamMember.userId, teamMember.teamId] }),
  })
);

export const teamMemberRelations = relations(teamMember, ({ one }) => ({
  team: one(team, {
    fields: [teamMember.teamId],
    references: [team.id],
  }),
  user: one(user, {
    fields: [teamMember.userId],
    references: [user.id],
  }),
}));
