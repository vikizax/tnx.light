import { sql } from "kysely";
import { db } from "../db";
import {
  CreateSpaceTnx,
  GetAllTransactionsQueryParams,
  UpdateSpaceTnx,
} from "../controllers/types";

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
  filters?: Omit<GetAllTransactionsQueryParams, "limit" | "page">
) {
  let totaltnxCursor = db
    .selectFrom("TNX_SCHEMA.transactions")
    .select(({ fn }) => fn.countAll().as("count"))
    .where("space_id", "=", spaceId + "");

  let resCursor = db
    .selectFrom("TNX_SCHEMA.transactions")
    .selectAll()
    .where("space_id", "=", spaceId + "");

  if (filters?.type) {
    resCursor = resCursor.where("type", "=", filters.type);
    totaltnxCursor = totaltnxCursor.where("type", "=", filters.type);
  }

  if (filters?.date) {
    resCursor = resCursor.where("created_at", "=", new Date(filters.date));
    totaltnxCursor = totaltnxCursor.where(
      "created_at",
      "=",
      new Date(filters.date)
    );
  }
  
  if (filters?.category) {
    resCursor = resCursor.where("category", "=", filters.category);
    totaltnxCursor = totaltnxCursor.where("category", "=", filters.category);
  }

  const totaltnx = await totaltnxCursor.executeTakeFirst();

  const res = await resCursor
    .limit(limit)
    .offset(limit * (page - 1))
    .execute();

  return {
    transactions: res,
    total: totaltnx?.count ? parseInt(totaltnx.count + "") : 0,
    total_page: totaltnx ? Math.ceil(parseInt(totaltnx.count + "") / limit) : 0,
  };
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
