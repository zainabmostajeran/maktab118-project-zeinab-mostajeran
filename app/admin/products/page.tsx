"use client";

import PageTitle from "@/components/admin/PageTitle";
import { Suspense, useMemo } from "react";
import { ProductList } from "@/components/admin/product/ProductList";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductForm from "@/components/admin/product/ProductForm";
import Modal from "@/components/ui/Modal";


const ProductPage: React.FC = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const currentPage = useMemo(() => {
    const parsed = parseInt(pageParam || "1", 10);
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [pageParam]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="mx-auto">
      <div className="flex justify-between items-center px-4">
      <PageTitle title="کالاها" />
        <button  onClick={() => setIsModalOpen(true)}  className="bg-slate-200 px-3 py-1 sm:px-8 sm:py-2 rounded-md font-bold hover:bg-slate-300">
          افزودن کالا
        </button>
      </div>
      <Suspense fallback={<div>در حال بارگذاری...</div>}>
        <ProductList page={currentPage} />
      </Suspense>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </section>
  );
};

export default ProductPage;
