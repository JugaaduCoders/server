import { pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./schema.helper";
import { relations } from "drizzle-orm";
import { hackathon } from "./hackathon";
import { hackathonParticipant } from "./hackathonParticipant";
import { teamMember } from "./teamMember";

export const rolesEnum = pgEnum("roles", ["participant", "user", "admin"]);

export const user = pgTable("Users", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
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
