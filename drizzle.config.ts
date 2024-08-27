import { defineConfig } from "drizzle-kit";

const env = process.env;

export default defineConfig({
  dialect: "postgresql",
  schema: "./schemas/*",
  out: "./src/drizzle",
  migrations: { schema: "./src/drizzle/migrations" },
  dbCredentials: {
    url: env.DB_URL,
    user: "postgres",
    password: env.DATABASE_PASSWORD,
    host: "127.0.0.1",
    port: 5432,
    database: "postgres",
  },
  verbose: true,
  strict: true,
});
