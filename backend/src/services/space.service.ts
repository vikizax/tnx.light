import { sql } from "kysely";
import { db } from "../db";
import { TNXSCHEMATransactions } from "../types/db/db";
import { CreateSpaceTnx } from "../controllers/types";

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
