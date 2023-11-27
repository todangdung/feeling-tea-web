import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducers: {
    tokenStorage: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },

    clearToken: (state) => {
      return {
        ...state,
        value: "",
      };
    },
  },
});

export const { tokenStorage, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
