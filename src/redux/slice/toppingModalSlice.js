import { createSlice } from "@reduxjs/toolkit";

export const toppingModalSlice = createSlice({
  name: "toppingModal",
  initialState: {
    value: false,
    product: {},
  },
  reducers: {
    toppingModalStorage: (state, actions) => {
      return {
        ...state,
        value: actions.payload.active,
        product: actions.payload.product,
      };
    },

    clearToppingModal: (state) => ({
      ...state,
      value: false,
    }),
  },
});

export const { toppingModalStorage, clearToppingModal } =
  toppingModalSlice.actions;

export default toppingModalSlice.reducer;
