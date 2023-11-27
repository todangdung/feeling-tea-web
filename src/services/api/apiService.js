import axios from "axios";
import store from "../../redux/store";

import { signOut } from "../../utils/appUtils";
import { BASE_URL_API, KEYS } from "../../constants/constants";
import { API_ERROR_CODES } from "../../constants/apiErrorCode";
import { clearLoading, loadingStorage } from "../../redux/slice/loadingSlice";
import { getItemLS } from "../../utils/localStore";

function FETCH({
  onSuccess,
  onError,
  url,
  method,
  body,
  params,
  headers = null,
  timeout = 10 * 3600,
  showLoading,
}) {
  const config = {
    method,
    baseURL: BASE_URL_API,
    url,
    data: body,
    timeout,
    params,
  };
  const token = getItemLS(KEYS.TOKEN);

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "*/*",
    "X-APP-KEY": "gongcha_app_mobile_2021",
    "X-USER-TOKEN": token,
  };
  if (headers) {
    config.headers = { ...defaultHeaders, ...headers };
  } else {
    config.headers = defaultHeaders;
  }
  showLoading && store.dispatch(loadingStorage());
  axios(config)
    .then(function (response) {
      onSuccess && onSuccess(response);
      showLoading && store.dispatch(clearLoading());
    })
    .catch(function (error) {
      // console.log("request error =================> error: ", error, config);
      onError && onError(error.response?.data);
      if (
        error.response?.data?.error_code === API_ERROR_CODES.PERMISSION_ERROR
      ) {
        signOut();
      }
      showLoading && store.dispatch(clearLoading());
    });
}

const GET = (data) => {
  data.method = "get";
  return FETCH(data);
};
const POST = (data) => {
  data.method = "post";
  return FETCH(data);
};
const PUT = (data) => {
  data.method = "put";
  return FETCH(data);
};
const DELETE = (data) => {
  data.method = "delete";
  return FETCH(data);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { GET, POST, PUT, DELETE };
