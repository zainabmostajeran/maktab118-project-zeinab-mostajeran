"use client";

import React, { Suspense, useMemo } from "react";
import PageTitle from "@/components/admin/PageTitle";
import { PriceList } from "@/components/admin/prices/PriceList";
import { useSearchParams } from "next/navigation";

const PricesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const currentPage = useMemo(() => {
    const parsed = parseInt(pageParam || "1", 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [pageParam]);

  return (
    <section className="mx-auto">
      <div className="flex justify-between items-center px-4">
      <PageTitle title="موجودی وقیمت ها" />

        <button  className="bg-slate-200 px-3 py-1 sm:px-8 sm:py-2 rounded-md font-bold hover:bg-slate-300">
          ذخیره
        </button>
      </div>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <PriceList page={currentPage} />
      </Suspense>
    </section>
  );
};

export default PricesPage;
