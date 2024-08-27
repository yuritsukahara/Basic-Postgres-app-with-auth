import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from './schemas'

export const connection = new Client({
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: Number(process.env.DATABASE_USER) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'postgres',
});

await connection.connect();

export const db = drizzle(connection, { schema });
