import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createSchema("TNX_SCHEMA").execute();
  await db.schema
    .withSchema("TNX_SCHEMA")
    .createTable("spaces")
    .addColumn("id", "bigserial", (cb) => cb.primaryKey())
    .addColumn("created_at", "date", (cb) => cb.defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropSchema("TNX_SCHEMA").cascade().execute();
}
