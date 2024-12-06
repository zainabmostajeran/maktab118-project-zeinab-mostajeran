"use client";

import PageTitle from "@/components/admin/PageTitle";
import { Suspense, useMemo } from "react";
import { ProductList } from "@/components/admin/product/ProductList";
import { useSearchParams } from "next/navigation";

const ProductPage: React.FC = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const currentPage = useMemo(() => {
    const parsed = parseInt(Array.isArray(page) ? page[0] : page, 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [page]);

  return (
    <section className="mx-auto">
      <div className="flex justify-between items-center px-4">
        <button className="bg-white px-3 py-1 sm:px-8 sm:py-2 rounded-md font-bold hover:bg-slate-300">
          افزودن کالا
        </button>
        <PageTitle title="کالاها" />
      </div>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <ProductList page={currentPage} />
      </Suspense>
    </section>
  );
};

export default ProductPage;
