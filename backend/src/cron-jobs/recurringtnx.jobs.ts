import { AsyncTask, SimpleIntervalJob } from "toad-scheduler";
import { db } from "../db";

function checkRecurringTransactionsForWeekly() {
  console.log("running checkRecurringTransactionsForWeekly");
  const today = new Date();
  let allTnxCursor = db
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
    ]);

  return allTnxCursor
    .where("rtnx.type", "=", "weekly")
    .execute()
    .then((weeklyTransactions) => {
      for (const transaction of weeklyTransactions) {
        const { amount, category, description, space_id, type } = transaction;
        const createdAt = new Date(transaction.created_at!);
        const dateDiff = Math.floor(
          (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (dateDiff > 0 && dateDiff % 7 === 0) {
          db.insertInto("TNX_SCHEMA.transactions")
            .values({
              amount,
              category,
              description,
              space_id,
              type,
              created_at: today,
            })
            .execute();
        }
      }
    });
}

function checkRecurringTransactionsForMonthly() {
  console.log("running checkRecurringTransactionsForMonthly");
  const today = new Date();

  let allTnxCursor = db
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
    ]);

  return allTnxCursor
    .where("rtnx.type", "=", "monthly")
    .execute()
    .then((monthlyTransactions) => {
      for (const transaction of monthlyTransactions) {
        const { amount, category, description, space_id, type } = transaction;
        const createdAt = new Date(transaction.created_at!);
        const monthsDiff =
          today.getMonth() -
          createdAt.getMonth() +
          12 * (today.getFullYear() - createdAt.getFullYear());

        if (monthsDiff > 0 && today.getDate() === createdAt.getDate()) {
          db.insertInto("TNX_SCHEMA.transactions")
            .values({
              amount,
              category,
              description,
              space_id,
              type,
              created_at: today,
            })
            .execute();
        }
      }
    });
}

const weeklyTnxTask = new AsyncTask(
  "weekly",
  () => checkRecurringTransactionsForWeekly(),
  (err) => console.log("failed to run weeklyTnxTask. " + err)
);
const monthlyTnxTask = new AsyncTask(
  "monthly",
  () => checkRecurringTransactionsForMonthly(),
  (err) => console.log("failed to run weeklyTnxTask. " + err)
);

export const recurringWeeklyTnxJob = new SimpleIntervalJob(
  { days: 1 },
  weeklyTnxTask,
  {
    preventOverrun: true,
    id: "recurring_weekly",
  }
);
export const recurringMonthlyTnxJob = new SimpleIntervalJob(
  { days: 1 },
  monthlyTnxTask,
  {
    preventOverrun: true,
    id: "recurring_monthly",
  }
);
