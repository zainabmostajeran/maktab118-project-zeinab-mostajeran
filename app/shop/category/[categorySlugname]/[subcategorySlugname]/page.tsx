"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSubCategoryBySlug } from "@/apis/services/subcategories";
import { getAllProducts } from "@/apis/services/products";
import { ProductCard } from "@/components/shop/Productcard";
import { SidebarCategory } from "@/components/shop/SidebarCategory";
import { MdOutlineArrowLeft } from "react-icons/md";

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

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useQuery<any>({
    queryKey: ["products"],
    queryFn: getAllProducts,
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
    <section className="container mx-auto max-w-[1400px] bg-second">
      <div className="flex flex-col gap-y-4 items-start justify-center">
        <div className="flex gap-x-2 items-center">
          <h1 className="text-2xl font-semibold">{subcategoryData?.name}</h1>
          <MdOutlineArrowLeft className="size-5 border border-textColor" />
        </div>
        <div className="flex items-start justify-center gap-x-10">
          <div>
            <SidebarCategory />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {productsData?.data?.products
              .filter((product) => product.subcategory == subcategoryId)
              .map((product: any) => (
                <ProductCard key={product._id} {...product} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubcategoryPage;