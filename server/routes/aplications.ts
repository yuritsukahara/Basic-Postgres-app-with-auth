import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createAplicationSchema } from "../sharedTypes";


import { db } from "../db"
import { aplications as aplicationsTable, insertAplicationsSchema, selectAplicationsSchema } from "../db/schemas/aplications"
import getUser from "../middlewares/authMiddleware";


export const aplicationRoute = new Hono()
    .get('/', getUser, async (c) => {
        const aplications = db.select().from(aplicationsTable)
        return c.json({ aplications })
    })
    .post('/', zValidator('json', createAplicationSchema), async (c) => {
        const aplication = await c.req.valid('json')

        const validatedAplication = insertAplicationsSchema.parse({
            ...aplication
        })

        const result = await db
            .insert(aplicationsTable)
            .values(validatedAplication)
            .returning()

        c.status(201)
        return c.json(result)
    })
    .get('/:id{[0-9]+}', getUser, async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        // if (!aplicacao) {
        //     return c.notFound()
        // }

    })
    .delete('/:id{[0-9]+}', getUser, async (c) => {
        const id = Number.parseInt(c.req.param('id'))
    })
// .put