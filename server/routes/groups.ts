import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createGroupsSchema } from "../sharedTypes";

import { db } from "../db"
import { users as usersTable } from "../db/schemas/users"
import { isUser } from "../middlewares/authMiddleware";
import { groups as groupsTable, insertGroupsSchema } from "../db/schemas";
import { eq } from "drizzle-orm"

export const groupsRoute = new Hono()
    .get('/', isUser(['ADMIN']), async (c) => {
        const result = await db
            .select()
            .from(groupsTable)

        return c.json({ groups: result });
    })
    .get('/:id{[0-9]+}', isUser(), async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const result = await db
            .select(
                {
                    "id": usersTable.id,
                    "user": usersTable.user,
                    "fullName": usersTable.fullName,
                    "email": usersTable.email,
                })
            .from(usersTable)
            .where(eq(usersTable.id, id))
            .then(res => res[0])

        return c.json({ group: result })
    })
    .post('/create', zValidator('json', createGroupsSchema), isUser(['ADMIN']), async (c) => {
        const data = await c.req.valid('json')

        const validatedSchema = insertGroupsSchema.parse({
            ...data
        })

        const createResult = await db
            .insert(groupsTable)
            .values(validatedSchema)
            .returning()

        c.status(201)
        return c.json(createResult)
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
                .delete(groupsTable)
                .where(eq(groupsTable.id, id))
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