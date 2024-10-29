import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env["POSTGRES_HOST"] ?? "postgres",
      database: process.env["POSTGRES_DB"] ?? "tnxlightdb",
      user: process.env["POSTGRES_USER"] ?? "user",
      password: process.env["POSTGRES_PASSWORD"] ?? "tnxligthdb",
      port: parseInt(process.env["POSTGRES_PORT"]!) ?? 5432,
    }),
  }),
});
