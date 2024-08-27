import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    codigo: z.string(),
    descricao: z.string(),
})

type Aplicacao = z.infer<typeof expenseSchema>

const createPostSchema = expenseSchema.omit({ id: true })

export const aplicationRoute = new Hono()
    .get('/', async (c) => {
        return c.json({ aplications: [] })
    })
    .post('/', zValidator('json', createPostSchema), async (c) => {
        const data = await c.req.valid('json')
        const aplicacao = createPostSchema.parse(data)
        console.log({ aplicacao })
        c.status(201)
        return c.json({ aplicacao })
    })
    .get('/:id{[0-9]+}', async (c) => {
        const id = Number.parseInt(c.req.param('id'))
        // if (!aplicacao) {
        //     return c.notFound()
        // }

    })
    .delete('/:id{[0-9]+}', async (c) => {
        const id = Number.parseInt(c.req.param('id'))

    })
// .put