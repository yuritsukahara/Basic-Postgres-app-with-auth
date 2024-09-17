import { Hono } from "hono";
const app = new Hono();
import { logger } from 'hono/logger'
import { usersRoute } from "./routes/users"
import { serveStatic } from 'hono/bun'
import { authRoute } from "./routes/auth";
import { jwt } from "hono/jwt";

app.use('*', logger())

// auth routes are protected
app.use(
    '/api/auth/*',
    jwt({
        secret: import.meta.env.VITE_JWT_TOKEN,
    })
)

const apiRoutes = app.basePath("/api").route('auth/users', usersRoute).route("/", authRoute)

app.get("*", serveStatic({ root: './frontend/dist' }))
app.get("*", serveStatic({ path: './frontend/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes


