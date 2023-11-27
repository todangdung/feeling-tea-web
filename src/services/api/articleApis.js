import apiService from "./apiService";

export function getArticle({ onSuccess, onError }) {
  return apiService.GET({
    onSuccess,
    onError,
    url: "/app/api/v1/article",
    showLoading: false,
  });
}
