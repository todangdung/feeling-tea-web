import { createSlice } from "@reduxjs/toolkit";

export const notiPopupSlice = createSlice({
  name: "notiPopup",
  initialState: {
    active: false,
    title: "Notification",
    message: "",
  },
  reducers: {
    notiPopupStorage: (state, action) => {
      const { payload } = action;

      const newState = {
        ...state,
        active: true,
        message: payload.message,
      };

      if (action.payload.title) {
        newState.title = action.payload.title;
      }

      return newState;
    },

    clearNotiPopup: (state) => ({
      ...state,
      active: false,
      title: "",
      message: "",
    }),
  },
});

export const { notiPopupStorage, clearNotiPopup } = notiPopupSlice.actions;

export default notiPopupSlice.reducer;
