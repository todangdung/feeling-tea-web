import { createSlice } from "@reduxjs/toolkit";

export const coinBalanceSlice = createSlice({
  name: "coinBalance",
  initialState: {
    value: {},
  },
  reducers: {
    coinBalanceStorage: (state, action) => {
      const { payload } = action;

      return {
        ...state,
        value: payload,
      };
    },

    clearCoinBalance: (state) => ({
      ...state,
      value: [],
    }),
  },
});

export const { coinBalanceStorage, clearCoinBalance } =
  coinBalanceSlice.actions;

export default coinBalanceSlice.reducer;
