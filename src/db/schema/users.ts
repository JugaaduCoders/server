import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./schema.helper";

export const rolesEnum = pgEnum("roles", ["participant", "user", "admin"]);

export const Users = pgTable("Users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  role: rolesEnum().notNull(),
  ...timestamps,
});
