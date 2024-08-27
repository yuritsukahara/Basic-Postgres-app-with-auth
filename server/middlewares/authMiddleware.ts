import { Hono } from 'hono'
import { createFactory, createMiddleware } from 'hono/factory'


type Env = {
    Variables: {
        user: {}
    }
}

const getUser = createMiddleware<Env>(async (c, next) => {
    try {
        const isAutenticate = await api.isAuthenticated(c);
        if (!isAutenticate) {
            return c.json({ error: "Unnauthorized" }, 401);
        }

        const user = await
            c.set("user: user");
        await next();
    }
    catch (e) {
        console.error(e);
        return c.json({ error: "Unauthorized" }, 401)
    }
})

export default getUser
