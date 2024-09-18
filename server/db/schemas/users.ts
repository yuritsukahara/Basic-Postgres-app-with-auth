import { pgTable, serial, index, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersToGroups } from "./usersToGroups";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    user: text("user").notNull().unique(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
  },
  (table) => {
    return {
      emailIndex: index("email_index").on(table.email),
    };
  }
);

export const usersRelations = relations(users, ({ many }) => ({
  usersToGroups: many(usersToGroups)
}))


// Schema for inserting a user - can be used to validate API requests
export const insertUsersSchema = createInsertSchema(users, {
  user: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(6), // when inserting remember to bcrypt
})

// Schema for selecting a user - can be used to validate API responses
export const selectUsersSchema = createSelectSchema(users).omit({ password: true })


