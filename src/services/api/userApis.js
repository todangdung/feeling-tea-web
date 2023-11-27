import ApiService from "./apiService";

const BASE_URL_V1 = "/app/api/v1";
const BASE_URL_V2 = "/app/api/v2";

export function getMembershipLog({ page = 1, onSuccess, onError }) {
  return ApiService.GET({
    onSuccess,
    onError,
    url: BASE_URL_V1 + "/membership_log",
    params: {
      page,
    },
    showLoading: true,
  });
}

export function getMembershipV1({ onSuccess, onError }) {
  return ApiService.GET({
    onSuccess,
    onError,
    url: BASE_URL_V1 + "/membership_detail",
    showLoading: true,
  });
}

export function getMembershipV2({ onSuccess, onError }) {
  return ApiService.GET({
    onSuccess,
    onError,
    url: BASE_URL_V2 + "/membership_detail",
    showLoading: true,
  });
}

export function getStores({ lat, lng, onSuccess, onError }) {
  return ApiService.GET({
    onSuccess,
    onError,
    params: {
      lat,
      lng,
    },
    url: BASE_URL_V1 + "/store",
  });
}

export function getItemCategories({ onSuccess, onError }) {
  return ApiService.GET({
    onSuccess,
    onError,
    url: BASE_URL_V1 + "/item_category",
  });
}

export function getMemberVouchers({ onSuccess, onError }) {
  return ApiService.GET({
    onSuccess,
    onError,
    url: BASE_URL_V1 + "/member_vouchers",
  });
}

export function listOrder({ page, onSuccess, onError }) {
  return ApiService.GET({
    onSuccess,
    onError,
    params: {
      per_page: 10,
      page,
    },
    url: "/api/v1.0/order/list",
  });
}

export function getAppConfig({ onSuccess, onError }) {
  return ApiService.GET({
    onSuccess,
    onError,
    url: BASE_URL_V1 + "/config",
  });
}
