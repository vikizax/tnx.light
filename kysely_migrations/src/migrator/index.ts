import * as path from "path";
import { promises as fs } from "fs";
import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "./db";

export const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, "../migrations"),
  }),
});
