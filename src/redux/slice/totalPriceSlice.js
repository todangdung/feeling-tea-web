import { createSlice } from "@reduxjs/toolkit";

export const totalPriceSlice = createSlice({
  name: "totalPrice",
  initialState: {
    value: [],
  },
  reducers: {
    totalPriceStorage: (state, action) => {
      const { payload } = action;
      const index = state.value.findIndex(
        (item) => item.timeChoose === payload.timeChoose
      );

      // them gia san pham vao store theo chooseTime
      if (index !== -1) {
        if (payload.value === 0) {
          // neu gia = 0 thi xoa tong gia cua chooseTime do
          state.value.splice(index, 1);
        } else {
          state.value[index] = { ...payload, timeChoose: payload.timeChoose };
        }
      } else {
        state.value.push(payload);
      }
    },

    clearTotalPrice: (state) => {
      state.value = [];
    },
  },
});

export const { totalPriceStorage, clearTotalPrice } = totalPriceSlice.actions;

export default totalPriceSlice.reducer;
