import axios from "axios";
import { getAccessToken, getRefreshToken } from "@/libs/session-manager";
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

export const generateClient = () => {
  const instance = axios.create({
    baseURL,
    timeout: 3000,
  });

  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((newToken: string) => {
              originalRequest.headers.Authorization = "Bearer " + newToken;
              resolve(instance(originalRequest));
            });
          });
        }

        isRefreshing = true;
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          store.dispatch(logout());
          return Promise.reject(error);
        }

        try {
          const { data } = await instance.post("/auth/token", { refreshToken });

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
          return instance(originalRequest);
        } catch (refreshError) {
          store.dispatch(logout());
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
