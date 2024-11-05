import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionRecurringType } from "../../api/types";

export type TransactionType = "income" | "expense";

export interface TransactionFiltersState {
  page: number;
  limit: number;
  type?: TransactionType;
  category?: string;
  date?: string;
  recurring?: TransactionRecurringType
}

const initialState: TransactionFiltersState = {
  limit: 10,
  page: 1,
};

export function getFilterValueTyped<K extends keyof TransactionFiltersState>(
  _: K,
  value: TransactionFiltersState[K]
) {
  return value;
}

export const transactionFilterSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setFilter: <K extends keyof TransactionFiltersState>(
      state: TransactionFiltersState,
      action: PayloadAction<{
        filter: K;
        value: TransactionFiltersState[K];
      }>
    ) => {
      const { filter, value } = action.payload;
      console.log({ filter, value });
      if (filter !== "page") {
        state["page"] = 1;
      }

      state[filter] = value;
    },
  },
});

// Export the action and reducer
export const { setFilter } = transactionFilterSlice.actions;
export default transactionFilterSlice.reducer;
