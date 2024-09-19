import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createUsersSchema } from "../sharedTypes";

import { db } from "../db"
import { users as usersTable, insertUsersSchema, selectUsersSchema, users } from "../db/schemas/users"
import { isUser } from "../middlewares/authMiddleware";
import { groups as groupsTable, usersToGroups as usersToGroupsTable } from "../db/schemas";
import { eq } from "drizzle-orm"

export const usersRoute = new Hono()
    .get('/', async (c) => {
        const users = await db
            .select()
            .from(usersTable)
            .innerJoin(usersToGroupsTable, eq(usersTable.id, usersToGroupsTable.userId))
            .innerJoin(groupsTable, eq(usersToGroupsTable.groupId, groupsTable.id));

        // Transform data to the desired format
        const usersWithGroups = users.map(user => ({
            id: user.users.id,
            user: user.users.user,
            fullName: user.users.fullName,
            email: user.users.email,
            groups: {
                id: user.groups.id,
                name: user.groups.name
            }
        }));

        return c.json({ users: usersWithGroups });
    })
    .post('/create', zValidator('json', createUsersSchema), isUser(['ADMIN']), async (c) => {
        const user = await c.req.valid('json')

        const validatedUser = insertUsersSchema.parse({
            ...user
        })

        const createResult = await db
            .insert(usersTable)
            .values(validatedUser)
            .returning()

        c.status(201)
        return c.json(createResult)
    })
    .get('/:id{[0-9]+}', isUser(), async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const user = await db
            .select(
                {
                    "id": usersTable.id,
                    "user": usersTable.user,
                    "fullName": usersTable.fullName,
                    "email": usersTable.email,
                })
            .from(usersTable)
            .where(eq(usersTable.id, id))

        return c.json({ user })
    })
    .delete('/:id{[0-9]+}', isUser(['ADMIN']), async (c) => {
        try {
            const id = Number.parseInt(c.req.param('id'));

            // Check if ID is valid não ta indo
            if (isNaN(id)) {
                return c.json({ error: 'Invalid ID' }, { status: 400 });
            }

            // Perform deletion
            const deleteResult = await db
                .delete(usersTable)
                .where(eq(usersTable.id, id))
                .returning();

            // Check if any rows were deleted
            if (deleteResult.length === 0) {
                return c.json({ error: 'User not found' }, { status: 404 });
            }

            // Successful deletion
            return c.json({ deleteResult }, { status: 200 }); // No content to return

        } catch (error) {
            // Properly handle and type the error
            if (error instanceof Error) {
                return c.json({ error: error.message }, { status: 500 });
            } else {
                return c.json({ error: 'An unexpected error occurred' }, { status: 500 });
            }
        }
    });