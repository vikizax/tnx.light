import { Kysely, sql } from "kysely";
import { db } from "../db";
import {
  CreateSpaceTnx,
  GetAllTransactionsQueryParams,
  UpdateSpaceTnx,
} from "../controllers/types";
import { DB } from "../types/db/db";

export async function checkSpaceExists(spaceId: number) {
  const res = await db
    .selectFrom("TNX_SCHEMA.spaces")
    .select(({ fn }) => fn.countAll().as("count"))
    .where("id", "=", spaceId + "")
    .executeTakeFirst();

  return res ? parseInt(res.count + "") > 0 : false;
}

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
    .selectFrom("TNX_SCHEMA.transactions as tnx")
    .leftJoin(
      "TNX_SCHEMA.recurring_tnx as rtnx",
      "tnx.id",
      "rtnx.transaction_id"
    )
    .select(({ fn }) => fn.countAll().as("count"))
    .where("space_id", "=", spaceId + "");

  let resCursor = db
    .selectFrom("TNX_SCHEMA.transactions as tnx")
    .leftJoin(
      "TNX_SCHEMA.recurring_tnx as rtnx",
      "tnx.id",
      "rtnx.transaction_id"
    )
    .select([
      "tnx.id",
      "tnx.space_id",
      "tnx.amount",
      "tnx.type",
      "tnx.category",
      "tnx.description",
      "tnx.created_at",
      "tnx.updated_at",
      "rtnx.type as recurring_type",
    ])
    .where("space_id", "=", spaceId + "");

  if (filters?.type) {
    resCursor = resCursor.where("tnx.type", "=", filters.type);
    totaltnxCursor = totaltnxCursor.where("tnx.type", "=", filters.type);
  }

  if (filters?.date) {
    resCursor = resCursor.where("created_at", "=", new Date(filters.date));
    totaltnxCursor = totaltnxCursor.where(
      "tnx.created_at",
      "=",
      new Date(filters.date)
    );
  }

  if (filters?.category) {
    resCursor = resCursor.where("tnx.category", "=", filters.category);
    totaltnxCursor = totaltnxCursor.where("tnx.category", "=", filters.category);
  }

  if (filters?.recurring) {
    resCursor = resCursor.where("rtnx.type", "=", filters.recurring);
    totaltnxCursor = totaltnxCursor.where("rtnx.type", "=", filters.recurring);
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
  const createTnx = async (db: Kysely<DB>) => {
    return await db
      .insertInto("TNX_SCHEMA.transactions")
      .values({
        amount: payload.amount,
        space_id: spaceId,
        category: payload.category,
        created_at: payload.createdAt,
        description: payload.description,
        type: payload.type,
      })
      .returning("id")
      .executeTakeFirstOrThrow();
  };

  if (!payload.recurring) {
    await createTnx(db);
  } else {
    await db.transaction().execute(async (tnx) => {
      const tnxId = await createTnx(db);
      tnx
        .insertInto("TNX_SCHEMA.recurring_tnx")
        .values({
          transaction_id: tnxId.id,
          type: payload.recurring!,
        })
        .execute();
    });
  }
}

export async function updateTnxBySpaceIdTnxId(
  spaceId: number,
  tnxId: number,
  payload: UpdateSpaceTnx
) {
  const updateTnx = async (db: Kysely<DB>) => {
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
  };

  if (!payload.recurring) {
    await updateTnx(db);
  } else {
    db.transaction().execute(async (tnx) => {
      await updateTnx(tnx);

      const recurringExists = await tnx
        .selectFrom("TNX_SCHEMA.recurring_tnx")
        .select(({ fn }) => fn.countAll().as("count"))
        .where("transaction_id", "=", tnxId + "")
        .executeTakeFirstOrThrow();

      if (parseInt(recurringExists.count + "") > 0) {
        await tnx
          .updateTable("TNX_SCHEMA.recurring_tnx")
          .set({
            type: payload.recurring,
            updated_at: sql`now()`,
          })
          .where("transaction_id", "=", tnxId + "")
          .execute();
      } else {
        await tnx
          .insertInto("TNX_SCHEMA.recurring_tnx")
          .values({
            type: payload.recurring!,
            transaction_id: tnxId,
          })
          .execute();
      }
    });
  }
}

export async function deleteTnxBySpaceIdTnxId(spaceId: number, tnxId: number) {
  await db
    .deleteFrom("TNX_SCHEMA.transactions")
    .where("id", "=", tnxId + "")
    .where("space_id", "=", spaceId + "")
    .execute();
}
