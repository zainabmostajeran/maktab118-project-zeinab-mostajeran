"use client";

import React, { Suspense, useMemo } from "react";
import { OrderList } from "@/components/admin/order/OrderList";
import { useSearchParams } from "next/navigation";

const OrdersPage: React.FC = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const currentPage = useMemo(() => {
    const parsed = parseInt(pageParam || "1", 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [pageParam]);

  return (
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <OrderList page={currentPage} />
      </Suspense>
  );
};

export default OrdersPage;
