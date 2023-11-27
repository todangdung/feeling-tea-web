import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/userSlice";
import tokenSlice from "./slice/tokenSlice";
import loadingSlice from "./slice/loadingSlice";
import toastSlice from "./slice/toastSlice";
import notiPopupSlice from "./slice/notiPopupSlice";
import articleSlice from "./slice/articleSlice";
import toppingModalSlice from "./slice/toppingModalSlice";
import totalPriceSlice from "./slice/totalPriceSlice";
import coinBalanceSlice from "./slice/coinBalanceSlice";
import walletBalanceSlice from "./slice/walletBalanceSlice";
import appConfigSlice from "./slice/appConfigSlice";

const reducers = {
  user: userSlice,
  token: tokenSlice,
  loading: loadingSlice,
  toast: toastSlice,
  notiPopup: notiPopupSlice,
  article: articleSlice,
  walletBalance: walletBalanceSlice,
  coinBalance: coinBalanceSlice,
  toppingModal: toppingModalSlice,
  totalPrice: totalPriceSlice,
  appConfig: appConfigSlice,
};

const store = configureStore({
  reducer: reducers,
});

export default store;
