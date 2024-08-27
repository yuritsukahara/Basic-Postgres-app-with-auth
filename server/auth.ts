import { Hono } from 'hono'
import getUser from './middlewares/auth';

export const authRoute = new Hono()
    .get("/login", async (c) => {
        const loginUrl = await api.login(c);
        return c.redirect(loginUrl.toString());
    })
    .get("/register", async (c) => {
        const registerUrl = await api.register(c);
        return c.redirect(registerUrl.register())
    })
    .get("/logout", async (c) => {
        const logoutUrl = await api.logout(c);
        return c.redirect(logoutUrl.toString());
    })
    .get("/me", getUser, async (c) => {
        const user = c.var.user
        return c.json({ user });
    })