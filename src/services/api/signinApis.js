import apiService from "./apiService";

const BASE_URL_V1 = "/app/api/v1";
const BASE_URL_V2 = "/app/api/v2";

export function checkUser({ phoneNumber, onSuccess, onError }) {
  return apiService.POST({
    onSuccess,
    onError,
    url: BASE_URL_V1 + "/check_user",
    body: {
      data: phoneNumber,
    },
    showLoading: true,
  });
}

export function logout({ onSuccess, onError }) {
  return apiService.POST({
    onSuccess,
    onError,
    url: BASE_URL_V1 + "/logout",
    showLoading: false,
  });
}

export function login({ phoneNumber, password, onSuccess, onError }) {
  return apiService.POST({
    body: {
      data: phoneNumber,
      password,
    },
    onSuccess,
    onError,
    url: BASE_URL_V2 + "/login",
    showLoading: true,
    hideLoading: false,
  });
}
