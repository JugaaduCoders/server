import {
  date,
  integer,
  pgTable,
  varchar,
  boolean,
  smallint,
  serial,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { timestamps } from "./schema.helper";
import { relations } from "drizzle-orm";
import { hackathonParticipant } from "./hackathonParticipant";

//
// we used date() instead of timestamp() because we are implementing linear time for starting, ending and registration of a hackathon
export const hackathon = pgTable("Hackathons", {
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
