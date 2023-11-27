import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {},
    rankInfo: [],
  },
  reducers: {
    userStorage: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },

    rankInfoStorage: (state, action) => {
      const rankInfo = action.payload.available_ranks.find(
        (item) => item.id === action.payload.rank_info.rank_id
      );

      return {
        ...state,
        rankInfo: rankInfo,
      };
    },

    clearUser: (state) => ({
      ...state,
      value: {},
      rankInfo: [],
    }),
  },
});

export const { userStorage, clearUser, rankInfoStorage } = userSlice.actions;

export default userSlice.reducer;
