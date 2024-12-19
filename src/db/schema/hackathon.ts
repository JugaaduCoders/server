import {
  date,
  integer,
  pgTable,
  varchar,
  boolean,
  smallint,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { timestamps } from "./schema.helper";
import { relations } from "drizzle-orm";

export const hackathon = pgTable("Hackathons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdBy: integer(),
  name: varchar({ length: 255 }).notNull(),
  registrationDeadline: date().notNull(),
  startDate: date().notNull(),
  endDate: date().notNull(),
  isPublic: boolean().default(true),
  maxTeamSize: smallint(),
  ...timestamps,
});

export const hackathonRelations = relations(hackathon, ({ one }) => ({
  user: one(user, {
    fields: [hackathon.createdBy],
    references: [user.id],
  }),
}));
