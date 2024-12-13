"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSubCategoryBySlug } from "@/apis/services/subcategories";
import { getProducts } from "@/apis/services/products";
import { ProductCard } from "@/components/shop/ProductCard";

const SubcategoryPage: React.FC = () => {
  const params = useParams();
  const { subcategorySlugname } = params;

  const {
    data: subcategoryData,
    isLoading: isSubcategoryLoading,
    isError: isSubcategoryError,
    error: subcategoryError,
  } = useQuery<any>({
    queryKey: ["subcategory", subcategorySlugname],
    queryFn: () => getSubCategoryBySlug(String(subcategorySlugname)),
    enabled: !!subcategorySlugname,
  });

  const subcategoryId = subcategoryData?._id;
  const productsLimit = 10;

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useQuery<any>({
    queryKey: ["products", subcategoryId],
    queryFn: () =>
      getProducts({
        subcategory: subcategoryId!,
        limit: String(productsLimit),
      }),
    enabled: !!subcategoryId,
  });

  if (isSubcategoryLoading || isProductsLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h3 className="text-lg">در حال بارگذاری...</h3>
      </div>
    );
  }

  if (isSubcategoryError) {
    return (
      <div className="text-red-500 text-center mt-10">
        خطا در بارگذاری دسته‌بندی: {subcategoryError.message}
      </div>
    );
  }

  if (isProductsError) {
    return (
      <div className="text-red-500 text-center mt-10">
        خطا در بارگذاری محصولات: {productsError.message}
      </div>
    );
  }

  if (productsData?.data?.products.length === 0) {
    return (
      <div className="text-center mt-10">
        هیچ محصولی برای این دسته‌بندی یافت نشد.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-7">
      <h2 className="text-2xl font-semibold mb-4">
        {subcategoryData?.name || "دسته‌بندی"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsData?.data?.products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SubcategoryPage;
