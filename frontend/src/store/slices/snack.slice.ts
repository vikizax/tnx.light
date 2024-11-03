import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SnackState {
  open: boolean;
  message: string;
}

const initialState: SnackState = {
  open: false,
  message: "",
};

export const snackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.message = action.payload
    },
    close: (state) => {
      state.open = false
      state.message = ''
    },
  },
});

export const { open, close } = snackSlice.actions;

export default snackSlice.reducer;
