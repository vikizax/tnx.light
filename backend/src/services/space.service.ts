import { sql } from "kysely";
import { db } from "../db";
import { CreateSpaceTnx, UpdateSpaceTnx } from "../controllers/types";

export async function createSpace() {
  const res = await db
    .insertInto("TNX_SCHEMA.spaces")
    .values({ created_at: sql`now()` })
    .returning("id")
    .executeTakeFirstOrThrow();
  return res.id;
}

export async function getAllTnxBySpaceId(
  spaceId: number,
  limit: number = 10,
  page: number = 1,
  filters?: any
) {
  const res = await db
    .selectFrom("TNX_SCHEMA.transactions")
    .selectAll()
    .where("space_id", "=", spaceId + "")
    .limit(limit)
    .offset(limit * (page - 1))
    .execute();

  return res;
}

export async function createTnxBySpaceId(
  spaceId: number,
  payload: CreateSpaceTnx
) {
  await db
    .insertInto("TNX_SCHEMA.transactions")
    .values({
      amount: payload.amount,
      space_id: spaceId,
      category: payload.category,
      created_at: payload.createdAt,
      description: payload.description,
      type: payload.type,
    })
    .execute();
}

export async function updateTnxBySpaceIdTnxId(
  spaceId: number,
  tnxId: number,
  payload: UpdateSpaceTnx
) {
  await db
    .updateTable("TNX_SCHEMA.transactions")
    .set({
      amount: payload.amount,
      category: payload.category,
      description: payload.description,
      created_at: payload.createdAt,
      type: payload.type,
      updated_at: sql`now()`,
    })
    .where("id", "=", tnxId + "")
    .where("space_id", "=", spaceId + "")
    .execute();
}

export async function deleteTnxBySpaceIdTnxId(spaceId: number, tnxId: number) {
  await db
    .deleteFrom("TNX_SCHEMA.transactions")
    .where("id", "=", tnxId + "")
    .where("space_id", "=", spaceId + "")
    .execute();
}
