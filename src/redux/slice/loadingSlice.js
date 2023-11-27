import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    loadingStorage: (state) => {
      return {
        ...state,
        value: true,
      };
    },

    clearLoading: (state) => ({
      ...state,
      value: false,
    }),
  },
});

export const { loadingStorage, clearLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
