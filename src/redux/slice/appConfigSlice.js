import { createSlice } from "@reduxjs/toolkit";

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: {
    value: "",
  },
  reducers: {
    appConfigStorage: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },

    clearAppConfig: (state) => {
      return {
        ...state,
        value: "",
      };
    },
  },
});

export const { appConfigStorage, clearAppConfig } = appConfigSlice.actions;

export default appConfigSlice.reducer;
