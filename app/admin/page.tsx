"use client";

import React, { Suspense, useMemo } from "react";
import PageTitle from "@/components/admin/PageTitle";
import { OrderList } from "@/components/admin/order/OrderList";
import { useSearchParams } from "next/navigation";
import ToggleGroup from "@/components/admin/order/ToggleGroup";

const OrdersPage: React.FC = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const currentPage = useMemo(() => {
    const parsed = parseInt(pageParam || "1", 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [pageParam]);

  return (
    <section className=" mx-auto">
      <div className="flex items-center justify-between px-16">
        <PageTitle title="سفارش ها" />
        <ToggleGroup />
      </div>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <OrderList page={currentPage} />
      </Suspense>
    </section>
  );
};

export default OrdersPage
