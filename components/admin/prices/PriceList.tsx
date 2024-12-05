"use client";

import React from "react";
import Link from "next/link";
import { productsLimit } from "@/utils/config";
import { getProducts } from "@/apis/services/products";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { classNames } from "@/utils/classname";

export const PriceList: React.FC<{ page: number }> = ({ page }) => {
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
    keepPreviousData: true,
  });

  const totalPages = React.useMemo(() => {
    if (!productsData?.total || !productsLimit) return 1;
    return Math.ceil(Number(productsData.total) / Number(productsLimit));
  }, [productsData, productsLimit]);

  if (productsLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-10 flex items-center justify-center text-nowrap">
          <Image
            className="animate-spin"
            src="/loading.svg"
            width={100}
            height={20}
            alt="Loading"
          />
          <p> در حال بارگذاری</p>
        </div>
      </div>
    );
  }

  if (productsError) {
    return <div className="text-red-500">خطا در بارگذاری داده‌ها</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center py-6">
      <table className="w-full text-white border-collapse border-slate-300 shadow-md overflow-scroll rounded-lg">
        <thead className="h-6">
          <tr className="bg-white text-center text-gray-800">
            <th className="h-10">موجودی</th>
            <th className="h-10 text-center">قیمت</th>
            <th className="h-10 text-center">کالا</th>
          </tr>
        </thead>
        <tbody className="text-center bg-base text-gray-900 font-semibold">
          {productsData?.data?.products.map((item: any) => (
            <tr
              className="even:bg-second hover:even:bg-white cursor-pointer text-center"
              key={item._id}
            >
              <td className="h-12">
                <input
                  className="w-20 bg-transparent placeholder-slate-900 text-center"
                  type="number"
                  placeholder={item.quantity}
                />
              </td>
              <td className="h-12">
                <input
                  className="w-20 bg-transparent placeholder-slate-900 text-center"
                  type="number"
                  placeholder={item.price}
                />
              </td>
              <td className="text-center">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="w-full flex justify-center items-center pt-10 gap-3">
        {/* Previous Button */}
        <Link
          href={`/admin/prices?${new URLSearchParams({
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
            href={`/admin/prices?${new URLSearchParams({
              page: String(el),
            })}`}
          >
            <span
              className={`cursor-pointer px-2 py-1 hover:bg-white ${
                el === page ? "bg-gray-300" : ""
              }`}
            >
              {el}
            </span>
          </Link>
        ))}

        {/* Next Button */}
        <Link
          href={`/admin/prices?${new URLSearchParams({
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
