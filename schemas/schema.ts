import { pgTable, serial, varchar, pgEnum, index } from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"]);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    user: varchar("user").notNull().unique(),
    fullName: varchar("full_name").notNull(),
    email: varchar("email").notNull().unique(),
    role: UserRole("userRole").default("BASIC").notNull(),
  },
  (table) => {
    return {
      emailIndex: index("emailIndex").on(table.email),
    };
  }
);
