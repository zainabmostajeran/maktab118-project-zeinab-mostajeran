"use client";

import React, { Suspense, useMemo } from "react";
import PageTitle from "@/components/admin/PageTitle";
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
    <section className="px-6">
      <div className="flex justify-between items-center px-4">
        <button className="bg-white px-3 py-1 sm:px-8 sm:py-2 rounded-md font-bold">
          ذخیره
        </button>
        <PageTitle title="سفارش‌ها" />
      </div>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <OrderList page={currentPage} />
      </Suspense>
    </section>
  );
};

export default OrdersPage;
