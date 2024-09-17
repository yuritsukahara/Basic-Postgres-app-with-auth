import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { groups } from "./groups";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const usersToGroups = pgTable(
    'users_to_groups',
    {
        userId: integer('user_id')
            .notNull()
            .references(() => users.id),
        groupId: integer('group_id')
            .notNull()
            .references(() => groups.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.groupId] }),
    }),
);

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
    group: one(groups, {
        fields: [usersToGroups.groupId],
        references: [groups.id],
    }),
    user: one(users, {
        fields: [usersToGroups.userId],
        references: [users.id],
    }),
}));

export const insertUsersToGroupsSchema = createInsertSchema(usersToGroups, {
    userId: z.number(),
    groupId: z.number(),
})

export const selectUsersToGroupsSchema = createSelectSchema(usersToGroups)
