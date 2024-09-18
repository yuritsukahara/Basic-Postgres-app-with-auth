import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, } from "drizzle-orm/pg-core";
import { users } from "./users";
import { usersToGroups } from "./usersToGroups";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const groups = pgTable(
  "groups",
  {
    id: serial("id").primaryKey(),
    name: varchar("user").notNull().unique(),
  }
);

export const groupsRelations = relations(groups, ({ many }) => ({
  usersToGroups: many(usersToGroups),
}));

export const insertGroupsSchema = createInsertSchema(groups, {
  name: z.string(),
})
