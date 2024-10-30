## Kysely Migrations

Change the directory to `kysely_migration`

```bash
 cd kysely_migration
```

Create a new migration file:

```bash
  npm run migration:new
```

It will create a `.ts` file file under the `src/migrations` folder.

Once the `.ts` file created you can write your migration script, here's an example:

```ts
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createSchema("SCHEMA").execute();
  await db.schema
    .withSchema("SCHEMA")
    .createTable("Role")
    .addColumn("id", "integer", (col) => col.notNull().primaryKey().unique())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn("read", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("write", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("update", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("delete", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) => col.notNull())
    .addUniqueConstraint("roles_unique_key", ["name", "id"])
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema
    .withSchema("SCHEMA")
    .dropTable("Roles")
    .cascade()
    .execute();
}
```

Once you done writing your migration script, run the build script:

```bash
   npm run build
```

> Note: Whenever there is a change, run the build script

To run the new migration:

```bash
   npm run migration:up
```

If you want to remove write permission from your newly created migration file run this command:

```bash
   npm run migration:up --remove w
```

To downgrade from a migration:

```bash
   npm run migration:down
```
