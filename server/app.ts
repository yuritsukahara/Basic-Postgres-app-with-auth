import { Hono } from "hono";
const app = new Hono();
import { logger } from 'hono/logger'
import { usersRoute } from "./routes/users"
import { serveStatic } from 'hono/bun'
import { authRoute } from "./routes/auth";
import { jwt } from "hono/jwt";
import { isUser } from "./middlewares/authMiddleware";

app.use('*', logger())

const apiRoutes = app.basePath("/api").route("/", authRoute).route('/users', usersRoute)

app.get("*", serveStatic({ root: './frontend/dist' }))
app.get("*", serveStatic({ path: './frontend/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes


