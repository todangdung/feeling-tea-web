import { createSlice } from "@reduxjs/toolkit";
import { TYPES_TOAST } from "../../constants/constants";

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    active: false,
    type: TYPES_TOAST.SUCCESS,
    message: "",
  },
  reducers: {
    toastStorage: (state, action) => {
      let newState = {
        ...state,
        active: true,
        message: action.payload.message,
      };

      if (action.payload.type) {
        newState.type = action.payload.type;
      }

      return newState;
    },

    clearToast: (state) => ({
      ...state,
      active: false,
      type: TYPES_TOAST.SUCCESS,
      message: "",
    }),
  },
});

export const { toastStorage, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
