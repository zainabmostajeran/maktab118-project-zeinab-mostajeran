"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoryBySlug } from "@/apis/services/categories";
import SubcategoryList from "@/components/shop/SubcategoryList";
import { MdOutlineArrowLeft } from "react-icons/md";

const CategoryPage: React.FC = () => {
  const params = useParams();
  const { categorySlugname } = params;

  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category", categorySlugname],
    queryFn: () => getCategoryBySlug(String(categorySlugname)),
    enabled: !!categorySlugname,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h3>در حال بارگذاری...</h3>
      </div>
    );
  }

  if (isError || !categoryData) {
    return <div className="text-red-500">دسته‌بندی یافت نشد</div>;
  }

  return (
    <section className="flex flex-col  gap-x-3 px-5 gap-y-3">
      <div className="flex gap-x-2 items-center px-4">
        <h1 className="text-3xl font-bold">{`گروه انواع ${categoryData.name}`}</h1>
        <MdOutlineArrowLeft className="size-5 border border-textColor" />
      </div>
      <div className="container mx-auto max-w-[1400px] bg-second p-4">
        <SubcategoryList category={categoryData} />
      </div>
    </section>
  );
};

export default CategoryPage;
