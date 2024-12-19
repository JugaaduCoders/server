import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { hackathon } from "./hackathon";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { serial } from "drizzle-orm/pg-core";

// here we are using timestamp() instead of date() because we want the time as well
export const hackathonParticipant = pgTable("HackathonParticipants", {
  id: serial().primaryKey(),
  submittedDate: timestamp(),
  submittedUrl: varchar({ length: 255 }),
  userId: integer().references(() => user.id),
  hackathonId: integer().references(() => hackathon.id),
});

export const hackathonParticipantRelations = relations(
  hackathonParticipant,
  ({ one }) => ({
    user: one(user, {
      fields: [hackathonParticipant.userId],
      references: [user.id],
    }),
    hackathon: one(hackathon, {
      fields: [hackathonParticipant.hackathonId],
      references: [hackathon.id],
    }),
  }),
);
