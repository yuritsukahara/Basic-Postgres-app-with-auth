import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/db/schemas/*",
  out: "./drizzle",
  migrations: { schema: "./drizzle/migrations" },
  dbCredentials: {
    url: process.env.DB_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: Number(process.env.DATABASE_USER) || 5432,
    database: process.env.DATABASE_NAME || 'postgres',
    ssl: false, // Disable SSL
  },
  verbose: true,
  strict: true,
});
