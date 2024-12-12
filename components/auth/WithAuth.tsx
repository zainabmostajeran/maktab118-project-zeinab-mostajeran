"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { getTokenExpiration } from "@/libs/session-manager";
import dayjs from "dayjs";

export const withAuth = (Component: React.FC) => {
  const AuthenticatedComponent: React.FC = () => {
    const { isAuthenticated, tokens } = useSelector(
      (state: RootState) => state.auth
    );
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const checkAuth = () => {
        if (!isAuthenticated) {
          if (pathname.includes("/admin")) {
            router.replace("/auth/login/admin");
          } else {
            router.replace("/auth/login");
          }
          return;
        }

        if (tokens?.refreshToken) {
          const refreshExp = getTokenExpiration(tokens.refreshToken);
          const now = dayjs().valueOf();

          if (refreshExp < now) {
            router.replace("/auth/login");
          }
        }
      };

      checkAuth();
    }, [isAuthenticated, tokens, pathname, router]);

    if (!isAuthenticated) return null;

    return <Component />;
  };

  return AuthenticatedComponent;
};
