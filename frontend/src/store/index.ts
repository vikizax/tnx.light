import { configureStore } from "@reduxjs/toolkit";
import { snackSlice } from "./slices/snack.slice";
import { transactionFilterSlice } from "./slices/transactionFilters.slice";
export const store = configureStore({
  reducer: {
    snack: snackSlice.reducer,
    transactionFilter: transactionFilterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
