import { createSlice } from "@reduxjs/toolkit";

export const walletBalanceSlice = createSlice({
  name: "walletBalance",
  initialState: {
    value: [],
  },
  reducers: {
    walletBalanceStorage: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },

    clearWalletBalance: (state) => ({
      ...state,
      value: [],
    }),
  },
});

export const { walletBalanceStorage, clearWalletBalance } =
  walletBalanceSlice.actions;

export default walletBalanceSlice.reducer;
