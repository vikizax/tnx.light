import { migrator } from "../migrator";
import { db } from "../migrator/db";

async function down() {
  const { error, results } = await migrator.migrateDown();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error(`failed to migrate: ${error}`);
    process.exit(1);
  }

  await db.destroy();
}

(async () => {
  await down();
})();