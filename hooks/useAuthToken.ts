// "use client";

// import { useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import dayjs from "dayjs";
// import { logout, updateTokens, loginSuccess } from "@/redux/slices/authSlice";
// import {
//   getAccessToken,
//   getRefreshToken,
//   getTokenExpiration,
//   removeTokens,
// } from "@/libs/session-manager";
// import axiosInstance from "@/apis/client";
// import { useRouter } from "next/navigation";
// import { RootState } from "@/redux/store";

// let refreshTimeout: NodeJS.Timeout;

// const useAuthToken = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const userRole = useSelector((state: RootState) => state.auth.user?.role);

//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated
//   );

//   const refreshAccessToken = useCallback(async () => {
//     const refreshToken = getRefreshToken();
//     if (!refreshToken) {
//       dispatch(logout());
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/auth/token", {
//         refreshToken,
//       });
//       const { accessToken, refreshToken: newRefreshToken } =
//         response.data.token;

//       dispatch(updateTokens({ accessToken, refreshToken: newRefreshToken }));

//       scheduleTokenRefresh(accessToken, newRefreshToken);
//     } catch (error) {
//       dispatch(logout());
//     }
//   }, [dispatch]);

//   const scheduleTokenRefresh = useCallback(
//     (accessToken: string, refreshToken: string) => {
//       const accessExp = getTokenExpiration(accessToken);
//       const refreshExp = getTokenExpiration(refreshToken);

//       const now = dayjs().valueOf();

//       const accessDelay = accessExp - now - 60000;
//       if (accessDelay > 0) {
//         refreshTimeout = setTimeout(refreshAccessToken, accessDelay);
//       }

//       const refreshDelay = refreshExp - now - 60000;
//       if (refreshDelay > 0) {
//         setTimeout(() => {
//           dispatch(logout());
//         }, refreshDelay);
//       } else {
//         dispatch(logout());
//       }
//     },
//     [dispatch, refreshAccessToken]
//   );

//   useEffect(() => {
//     const accessToken = getAccessToken();
//     const refreshToken = getRefreshToken();

//     if (accessToken && refreshToken) {
//       const accessExp = getTokenExpiration(accessToken);
//       const refreshExp = getTokenExpiration(refreshToken);
//       const now = dayjs().valueOf();

//       if (refreshExp < now) {
//         dispatch(logout());
//       } else if (accessExp < now) {
//         refreshAccessToken();
//       } else {
//         scheduleTokenRefresh(accessToken, refreshToken);
//       }
//     }

//     return () => {
//       if (refreshTimeout) clearTimeout(refreshTimeout);
//     };
//   }, [dispatch, refreshAccessToken, scheduleTokenRefresh]);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       if (userRole === "ADMIN") {
//         router.replace("/auth/login/admin");
//       } else {
//         router.replace("/auth/login");
//       }
//     }
//   }, [isAuthenticated, router]);
// };

// export default useAuthToken;
