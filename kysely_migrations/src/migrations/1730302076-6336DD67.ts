import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.executeQuery(sql`SET TIME ZONE 'Asia/Kolkata'`.compile(db));

  await db.schema
    .withSchema("TNX_SCHEMA")
    .createTable("transactions")
    .addColumn("id", "bigserial", (cb) => cb.primaryKey())
    .addColumn("space_id", "bigint", (cb) => cb.notNull())
    .addColumn("type", "varchar(10)", (cb) =>
      cb
        .notNull()
        .defaultTo("expense")
        .check(sql`type IN ('income', 'expense')`)
    )
    .addColumn("category", "varchar")
    .addColumn("amount", "numeric(15, 2)", (cb) => cb.notNull())
    .addColumn("description", "varchar")
    .addColumn("created_at", "date", (cb) => cb.defaultTo(sql`now()`))
    .addColumn("updated_at", "date", (cb) => cb.defaultTo(sql`now()`))
    .addForeignKeyConstraint(
      "space_tnx_cons",
      ["space_id"],
      "spaces",
      ["id"],
      (fb) => fb.onDelete("cascade")
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.withSchema("TNX_SCHEMA").dropTable("transactions").execute();
}
