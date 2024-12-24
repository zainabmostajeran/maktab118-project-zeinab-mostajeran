"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

export function useAdminGuard() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "ADMIN") {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, user, router]);
}
