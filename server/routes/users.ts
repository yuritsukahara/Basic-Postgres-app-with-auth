import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createUsersSchema } from "../sharedTypes";

import { db } from "../db"
import { users as usersTable, insertUsersSchema, selectUsersSchema } from "../db/schemas/users"

export const usersRoute = new Hono()
    .get('/', async (c) => {
        const users = await db.select().from(usersTable)
        return c.json({ users: users })
    })
    .post('/', zValidator('json', createUsersSchema), async (c) => {
        const user = await c.req.valid('json')

        const validatedUser = insertUsersSchema.parse({
            ...user
        })

        const result = await db
            .insert(usersTable)
            .values(validatedUser)
            .returning()
        c.status(201)
        return c.json(result)
    })
    .get('/:id{[0-9]+}', async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        // if (!user) {
        //     return c.notFound()
        // }

    })
    .delete('/:id{[0-9]+}', async (c) => {
        const id = Number.parseInt(c.req.param('id'))
    })
// .put