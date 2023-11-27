import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    value: [],
  },
  reducers: {
    articleStorage: (state, action) => {
      const { payload } = action;
      const articles = payload.filter((article) => article.active === true);

      return {
        ...state,
        value: articles,
      };
    },

    clearArticle: (state) => ({
      ...state,
      value: [],
    }),
  },
});

export const { articleStorage, clearArticle } = articleSlice.actions;

export default articleSlice.reducer;
