import apiService from "./apiService";

const BASE_URL_API = "/app/api/wallet/v1";

export function sendWalletTransaction({ body, onSuccess, onError }) {
  return apiService.POST({
    onSuccess,
    onError,
    body: body,
    url: BASE_URL_API + "/get_balance",
    showLoading: false,
  });
}

export function getHeoVangQROrder({ code, onSuccess, onError }) {
  return apiService.GET({
    onSuccess,
    onError,
    params: {
      code,
    },
    url: BASE_URL_API + "/get_qrcode",

    showLoading: false,
  });
}

export function getWalletBalance({ onSuccess, onError }) {
  return apiService.GET({
    onSuccess,
    onError,
    url: BASE_URL_API + "/get_balance",
  });
}

export function getTransactionHistory({ body, onSuccess, onError }) {
  return apiService.POST({
    onSuccess,
    onError,
    body,
    url: BASE_URL_API + "/transaction_history",
  });
}
