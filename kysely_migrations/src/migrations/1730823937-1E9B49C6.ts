import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .withSchema("TNX_SCHEMA")
    .createTable("recurring_tnx")
    .addColumn("id", "bigserial", (cb) => cb.primaryKey())
    .addColumn("transaction_id", "bigint", (cb) => cb.notNull())
    .addColumn("type", "varchar(10)", (cb) =>
      cb
        .notNull()
        .check(sql`type IN ('weekly', 'monthly')`)
    )
    .addColumn("created_at", "date", (cb) => cb.defaultTo(sql`now()`))
    .addColumn("updated_at", "date", (cb) => cb.defaultTo(sql`now()`))
    .addForeignKeyConstraint(
      "recurring_transactions_cons",
      ["transaction_id"],
      "transactions",
      ["id"],
      (fb) => fb.onDelete("cascade")
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.withSchema("TNX_SCHEMA").dropTable("recurring_tnx").execute();
}
