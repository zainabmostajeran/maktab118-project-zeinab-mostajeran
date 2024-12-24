"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/redux/slices/authSlice";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/libs/session-manager";

import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/apis/client";

interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
}

const AuthInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken && !refreshToken) {
        dispatch(logout());
        return;
      }

      const isAccessTokenValid = (): boolean => {
        try {
          const decoded = jwtDecode<DecodedToken>(accessToken!);
          const currentTime = Date.now() / 1000;

          return decoded.exp > currentTime;
        } catch (error) {
          return false;
        }
      };

      if (accessToken && isAccessTokenValid()) {
        try {
          const decoded = jwtDecode<DecodedToken>(accessToken);

          const response = await axiosInstance.get(`/users/${decoded.id}`);
          const user = response.data.data.user;

          dispatch(
            loginSuccess({ tokens: { accessToken, refreshToken }, user })
          );
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          dispatch(logout());
        }
      } else if (refreshToken) {
        try {
          const response = await axiosInstance.post("/auth/token", {
            refreshToken,
          });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data.token;

          setTokens(newAccessToken, newRefreshToken);

          const decoded = jwtDecode<DecodedToken>(newAccessToken);

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
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
    };

    void initializeAuth();
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
