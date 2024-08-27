import { Hono } from "hono";
const app = new Hono();
import { logger } from 'hono/logger'
import { aplicationRoute } from "./routes/aplications"
import { serveStatic } from 'hono/bun'
import { authRoute } from "./auth";

app.use('*', logger())

const apiRoutes = app.basePath("/api").route('/aplicacao', aplicationRoute).route("/", authRoute)

app.get("*", serveStatic({ root: './frontend/dist' }))
app.get("*", serveStatic({ path: './frontend/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes


