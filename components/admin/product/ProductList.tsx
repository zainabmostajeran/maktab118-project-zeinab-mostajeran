"use client";

import React from "react";
import Link from "next/link";
import { productsLimit } from "@/utils/config";
import { getProducts } from "@/apis/services/products";
import { getCategories } from "@/apis/services/categories";
import { getSubCategories } from "@/apis/services/subcategories";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { classNames } from "@/utils/classname";

export const ProductList: React.FC<{ page: number }> = ({ page }) => {
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorData,
  } = useQuery({
    queryKey: ["get-product", page],
    queryFn: () =>
      getProducts({
        page: String(page),
        limit: String(productsLimit),
      }),
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: subCategoriesData,
    isLoading: subCategoriesLoading,
    isError: subCategoriesError,
    error: subCategoriesErrorData,
  } = useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubCategories,
  });

  const categoryMap = React.useMemo(() => {
    if (!categoriesData?.data?.categories) return {};
    const map: Record<string, string> = {};
    categoriesData.data.categories.forEach((cat: any) => {
      map[cat._id] = cat.name;
    });
    return map;
  }, [categoriesData]);

  const subCategoryMap = React.useMemo(() => {
    if (!subCategoriesData?.data?.subcategories) return {};
    const map: Record<string, string> = {};
    subCategoriesData.data.subcategories.forEach((subcat: any) => {
      map[subcat._id] = subcat.name;
    });
    return map;
  }, [subCategoriesData]);

  const totalPages = React.useMemo(() => {
    if (!productsData?.total || !productsData) return 1;
    return Math.ceil(Number(productsData.total) / Number(productsLimit));
  }, [productsData, productsLimit]);

  const isLoading =
    productsLoading || categoriesLoading || subCategoriesLoading;
  const isErrorState = productsError || categoriesError || subCategoriesError;

  if (isLoading) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <div className="w-10 flex  items-center justify-center text-center text-nowrap">
          <Image
            className="animate-spin"
            src="/loading.svg"
            width={100}
            height={20}
            alt="Loading"
          />
          <p> درحال بارگذاری</p>
        </div>
      </div>
    );
  }
  if (isErrorState) {
    return <div className="text-red-500">خطا در بارگذاری داده‌ها</div>;
  }
  return (
    <section className="flex flex-col items-center justify-center py-6">
      <table className="w-full text-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-white text-gray-800">
            <th className="h-12">عملیات</th>
            <th>دسته بندی</th>
            <th>زیر دسته بندی</th>
            <th>نام کالا</th>
            <th>تصویر</th>
          </tr>
        </thead>
        <tbody className="text-center bg-base text-gray-800 font-semibold shadow-md">
          {productsData?.data?.products?.map((item: any) => (
            <tr
              className="even:bg-[#BCB88A] hover:even:bg-white cursor-pointer"
              key={item._id}
            >
              <td>
                <div className="flex gap-x-2 items-center justify-center text-gray-800 ">
                  <button className="px-2 py-1 bg-slate-200 hover:bg-slate-300 rounded-lg">
                    ویرایش
                  </button>
                  <button className="bg-red-500 px-2 py-1 hover:bg-red-400 rounded-lg">
                    حذف
                  </button>
                </div>
              </td>
              <td>{categoryMap[item.category]}</td>
              <td>{subCategoryMap[item.subcategory]}</td>
              <td>{item.name}</td>
              <td className=" flex flex-col items-center p-3">
                <Image
                  className="rounded-full object-cover"
                  src={`http://localhost:8000/images/products/images/${item.images[0]}`}
                  alt={item.name}
                  width={80}
                  height={80}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="w-full flex justify-center items-center pt-10 gap-3">
        {/* Previous Button */}
        <Link
          href={`/admin/products?${new URLSearchParams({
            page: String(page - 1 < 1 ? 1 : page - 1),
          })}`}
        >
          <button
            className={classNames(
              "px-2 py-1 text-white disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700 rounded-xl"
            )}
            disabled={page - 1 < 1}
          >
            قبلی
          </button>
        </Link>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((el) => (
          <Link
            key={el}
            href={`/admin/products?${new URLSearchParams({
              page: String(el),
            })}`}
          >
            <span
              className={`cursor-pointer px-2 py-1 hover:bg-white ${
                el === page ? "bg-slate-300" : ""
              }`}
            >
              {el}
            </span>
          </Link>
        ))}

        {/* Next Button */}
        <Link
          href={`/admin/products?${new URLSearchParams({
            page: String(page + 1 > totalPages ? page : page + 1),
          })}`}
        >
          <button
            className={classNames(
              "px-2 py-1 text-white disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700 rounded-xl"
            )}
            disabled={page + 1 > totalPages}
          >
            بعدی
          </button>
        </Link>
      </div>
    </section>
  );
};
