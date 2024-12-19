import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./schema.helper";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { teamMember } from "./teamMember";

export const team = pgTable("Teams", {
  id: serial().primaryKey(),
  teamName: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export const teamRelations = relations(team, ({ many }) => ({
  teamMember: many(teamMember),
}));
