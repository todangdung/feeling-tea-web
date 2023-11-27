import { KEYS } from "../constants/constants";
import { appConfigStorage } from "../redux/slice/appConfigSlice";
import { coinBalanceStorage } from "../redux/slice/coinBalanceSlice";
import { clearToken, tokenStorage } from "../redux/slice/tokenSlice";
import {
  clearUser,
  rankInfoStorage,
  userStorage,
} from "../redux/slice/userSlice";
import { walletBalanceStorage } from "../redux/slice/walletBalanceSlice";
import store from "../redux/store";
import { getCoinBalance } from "../services/api/coinApis";
import { logout } from "../services/api/signinApis";
import { getAppConfig, getMembershipV2 } from "../services/api/userApis";
import { getWalletBalance } from "../services/api/walletApis";
import { getItemLS } from "./localStore";

const signOut = () => {
  logout({});
  store.dispatch(clearUser());
  store.dispatch(clearToken());
};

const formatMoneyVN = (number) => {
  const newNumber = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);

  return newNumber;
};

function formatMoney(number) {
  if (number) {
    const formattedNumber = Math.ceil(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedNumber;
  } else {
    return null;
  }
}

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject("Lỗi: " + error.message);
        }
      );
    } else {
      reject("Trình duyệt của bạn không hỗ trợ định vị.");
    }
  });
}

const startUpApp = () => {
  const token = getItemLS(KEYS.TOKEN);
  if (token) {
    store.dispatch(tokenStorage(token));
  } else {
    return;
  }

  // get data user
  getMembershipV2({
    onSuccess: (resp) => {
      store.dispatch(userStorage(resp.data));
      store.dispatch(rankInfoStorage(resp.data));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  //get wallet balance
  getWalletBalance({
    onSuccess: (resp) => {
      store.dispatch(walletBalanceStorage(resp.data));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // get coin wallet balance
  getCoinBalance({
    onSuccess: (resp) => {
      store.dispatch(coinBalanceStorage(resp.data.data));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // get app config
  getAppConfig({
    onSuccess: (resp) => {
      store.dispatch(appConfigStorage(resp.data));
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

const isLoadMore = () => {
  if (
    window.innerHeight + document.documentElement.scrollTop + 0.50428374923 >=
    document.scrollingElement.scrollHeight
  ) {
    return true;
  } else {
    return false;
  }
};

export {
  formatMoneyVN,
  formatMoney,
  signOut,
  getLocation,
  startUpApp,
  isLoadMore,
};
