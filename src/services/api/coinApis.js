import apiService from "./apiService";

const BASE_URL_API = "/app/api/v1.0/coin";

export function getCoinBalance({ onSuccess, onError }) {
  return apiService.GET({
    onSuccess,
    onError,
    url: BASE_URL_API + "/balance",
  });
}

export function getCoinHistory({ page, onSuccess, onError }) {
  return apiService.GET({
    onSuccess,
    onError,
    params: {
      page,
    },
    url: BASE_URL_API + "/history",
  });
}
