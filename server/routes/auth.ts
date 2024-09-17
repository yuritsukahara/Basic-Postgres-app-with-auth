import { Hono } from 'hono'
import { db } from '../db'
import { eq } from 'drizzle-orm';
import { groups, users as usersTable, usersToGroups } from '../db/schemas'
import { decode, sign, verify } from 'hono/jwt'
import bcrypt from 'bcrypt';
import { json } from 'drizzle-orm/mysql-core';

export const authRoute = new Hono()
    .post("/login", async (c) => {
        try {
            // Ensure the content-type is application/json
            if (c.req.header('content-type') !== 'application/json') {
                return c.json({ error: 'Content-Type must be application/json' }, 400);
            }

            // Parse the JSON body
            const { user, password } = await c.req.json();

            if (!user || !password) {
                return c.json({ error: 'Usuário e senha obrigatórios' }, 400);
            }

            // Fetch user data from the database
            const userData = await db.select().from(usersTable).where(eq(usersTable.user, user));

            // Check if user exists
            if (!userData.length) {
                return c.json({ error: 'Usuário não encontrado' }, 404);
            }

            // Check if the password matches
            const validUser = await bcrypt.compare(password, userData[0].password);

            if (!validUser) {
                return c.json({ error: 'Senha incorreta' }, 401);
            }

            // If the password is valid, create token and return success

            // Fetch user groups based on the user ID
            const userGroups = await db
                .select()
                .from(usersToGroups)
                .where(eq(usersToGroups.userId, userData[0].id));

            // Fetch the corresponding groups names for user
            const userGroupsList = await Promise.all(
                userGroups.map(async (userGroup) => {
                    const group = await db.select().from(groups).where(eq(groups.id, userGroup.groupId));
                    return group[0].name;
                })
            );


            const payload = {
                user: user,
                groups: userGroupsList,
                authorized: true,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12, // expira o token em 12h
            }

            const token = await sign(payload, import.meta.env.VITE_JWT_TOKEN)

            return c.json({ token, ...payload }, 200);

        } catch (error) {
            console.error("Login error: ", error);
            return c.json({ error: 'Internal server error' }, 500);
        }
    })
    .get("auth/me", async (c) => {
        const payload = c.get('jwtPayload')
        return c.json(payload)
    })
// .get("/register", async (c) => {
//     const registerUrl = await api.register(c);
//     return c.redirect(registerUrl.register())
// })
// .get("/logout", async (c) => {
//     const logoutUrl = await api.logout(c);
//     return c.redirect(logoutUrl.toString());
// })
