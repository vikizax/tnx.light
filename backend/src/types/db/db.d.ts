/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface TNXSCHEMARecurringTnx {
  created_at: Generated<Timestamp | null>;
  id: Generated<Int8>;
  transaction_id: Int8;
  type: string;
  updated_at: Generated<Timestamp | null>;
}

export interface TNXSCHEMASpaces {
  created_at: Generated<Timestamp | null>;
  id: Generated<Int8>;
}

export interface TNXSCHEMATransactions {
  amount: Numeric;
  category: string | null;
  created_at: Generated<Timestamp | null>;
  description: string | null;
  id: Generated<Int8>;
  space_id: Int8;
  type: Generated<string>;
  updated_at: Generated<Timestamp | null>;
}

export interface DB {
  "TNX_SCHEMA.recurring_tnx": TNXSCHEMARecurringTnx;
  "TNX_SCHEMA.spaces": TNXSCHEMASpaces;
  "TNX_SCHEMA.transactions": TNXSCHEMATransactions;
}
