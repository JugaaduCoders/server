import {
  date,
  integer,
  pgTable,
  varchar,
  boolean,
  smallint,
} from "drizzle-orm/pg-core";
import { user } from "./users";
import { timestamps } from "./schema.helper";

export const hackathon = pgTable("Hackathons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdBy: integer().references(() => user.id),
  name: varchar().notNull(),
  registrationDeadline: date().notNull(),
  startDate: date().notNull(),
  endDate: date().notNull(),
  isPublic: boolean().default(true),
  maxTeamSize: smallint(),
  ...timestamps,
});
