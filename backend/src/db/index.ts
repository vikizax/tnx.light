import { DB } from "../types/db/db";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

export const pgPool = new Pool({
  database: "tnxlightdb",
  host: process.env["POSTGRES_HOST_NAME"] ?? "postgres",
  password: process.env["POSTGRES_PASSWORD"],
  user: process.env["POSTGRES_USER"],
  port: 5432,
  max: 20,
});

const dialect = new PostgresDialect({
  pool: pgPool,
});

export const db = new Kysely<DB>({
  dialect,
});
