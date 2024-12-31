"use client";

import React, { Suspense, useMemo } from "react";
import PageTitle from "@/components/admin/PageTitle";
import { OrderList } from "@/components/admin/order/OrderList";
import { useSearchParams } from "next/navigation";
import ToggleGroup from "@/components/admin/order/ToggleGroup";
import {useAdminGuard} from "@/hooks/useAdminGuard"
const OrdersPage: React.FC = () => {
  useAdminGuard()
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const currentPage = useMemo(() => {
    const parsed = parseInt(pageParam || "1", 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [pageParam]);

  return (
    <section className="mx-auto">
      <div className="block px-2  mx-auto sm:flex sm:items-center sm:justify-between sm:px-16">
        <PageTitle className="px-2" title="سفارش ها" />
        <ToggleGroup/>
      </div>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <OrderList page={currentPage} />
      </Suspense>
    </section>
  );
};

export default OrdersPage
