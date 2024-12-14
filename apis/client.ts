import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
} from "@/libs/session-manager";
import { store } from "@/redux/store";
import {
  logout,
  updateTokens as updateTokensAction,
} from "@/redux/slices/authSlice";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

const baseURL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 3000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status);
    if (error.response?.status === 401 || !originalRequest.sent) {
      console.log("ok");

      originalRequest.sent = true;

      if (
        originalRequest.url !== "/auth/login " ||
        originalRequest.url !== "/auth/token"
      ) {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          store.dispatch(logout());
          return Promise.reject(error);
        }
        console.log("before try");

        try {
          const { data } = await axiosInstance.post("/auth/token", {
            refreshToken,
          });

          const newAccessToken = data.token.accessToken;
          const newRefreshToken = data.token.refreshToken;

          store.dispatch(
            updateTokensAction({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            })
          );

          isRefreshing = false;
          onRefreshed(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          store.dispatch(logout());
          isRefreshing = false;
          removeTokens();
          return Promise.reject(refreshError);
        }
      } else if (
        originalRequest.url === "/auth/token" &&
        originalRequest.url !== "/auth/login"
      ) {
        store.dispatch(logout());
        isRefreshing = false;
        removeTokens();
        location.href = "/auth/login/admin";
      }
    }
    return error.response;
  }
);

export default axiosInstance;
