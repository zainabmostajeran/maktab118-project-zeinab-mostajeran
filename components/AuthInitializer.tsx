"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/redux/slices/authSlice";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/libs/session-manager";
import axiosInstance from "@/apis/client";
import { useLogout } from "@/apis/mutation/logout";

interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
}

const jwtDecode = (token: string): DecodedToken => {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

const AuthInitializer: React.FC = () => {
  const dispatch = useDispatch();
  const logoutMutation = useLogout();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken && !refreshToken) {
        logoutMutation.mutate();
        return;
      }

      const isAccessTokenValid = (): boolean => {
        try {
          const decoded = jwtDecode(accessToken!);
          const currentTime = Date.now() / 1000;
          return decoded.exp > currentTime;
        } catch (error) {
          return false;
        }
      };

      if (accessToken && isAccessTokenValid()) {
        try {
          const decoded = jwtDecode(accessToken);

          const response = await axiosInstance.get(`/users/${decoded.id}`);
          const user = response.data.data.user;

          dispatch(
            loginSuccess({ tokens: { accessToken, refreshToken }, user })
          );
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          logoutMutation.mutate();
        }
      } else if (refreshToken) {
        try {
          const response = await axiosInstance.post("/auth/token", {
            refreshToken,
          });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data.token;

          setTokens(newAccessToken, newRefreshToken);

          const decoded = jwtDecode(newAccessToken);
          const userResponse = await axiosInstance.get(`/users/${decoded.id}`);
          const user = userResponse.data.data.user;

          dispatch(
            loginSuccess({
              tokens: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              },
              user,
            })
          );
        } catch (error) {
          console.error("Failed to refresh token:", error);
          logoutMutation.mutate();
        }
      } else {
        logoutMutation.mutate();
      }
    };

    initializeAuth();
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
