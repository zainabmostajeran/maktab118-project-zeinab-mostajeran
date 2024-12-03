"use client";
import React from "react";
import Link from "next/link";
import { productsLimit } from "@/utils/config";
import { getProducts } from "@/apis/services/products";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { classNames } from "@/utils/classname";

export const OrderList: React.FC<{ page: number }> = ({ page }) => {
  const product = useQuery({
    queryKey: ["get-product", page],
    queryFn: () =>
      getProducts({
        page: String(1),
        limit: String(productsLimit),
      }),
  });
  const totalPages = Math.max(Number(product.total) / Number(productsLimit));

  React.useEffect(() => {
    if (product.isSuccess && product.data) {
      console.log("Fetch successful", product.data);
    }
  }, [product.isSuccess, product.data]);

  React.useEffect(() => {
    if (product.error || product.isError) {
      console.error("Something went wrong", product.error);
    }
  }, [product.error, product.isError]);

  return (
    <section className="flex flex-col items-center justify-center py-6">
      {!product.isLoading ? (
        <table className="w-full text-white border-collapse border-slate-300 shadow-md overflow-scroll">
          <thead>
            <tr>
            <th className="bg-base">#</th>
              <th className="bg-base">زمان سفارش</th>
              <th className="bg-base"> مجموع مبلغ</th>
              <th className="bg-base">نام کاربر</th>
            </tr>
          </thead>
          <tbody className="even:bg-white text-center text-gray-600 border-collapse border border-slate-300">
            {product.data?.products?.map((item: any, index: number) => (
              <tr key={index}>
                <td>بررسی سفارش</td>
                <td>{item.createdAt}</td>
                <td>{item.name}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-right">درحال بارگذاری</p>
      )}
      <div className="w-full flex justify-center pt-10 gap-5">
        <Link
          href={
            `?` +
            new URLSearchParams({
              page: String(page - 1 < 1 ? page : page - 1),
            })
          }
        >
          <button
            className={classNames(
              "px-2 py-1 text-white  disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700 rounded-xl"
            )}
            disabled={page - 1 < 1}
          >
            Previous
          </button>
        </Link>
        {[1, 2, 3].map((el, index) => {
          return (
            <Link href="/admin/orders">
              <span
                className="cursor-pointer px-2 py-1 hover:bg-white"
                key={index}
              >
                {el}
              </span>
            </Link>
          );
        })}
        <Link
          href={
            `?` +
            new URLSearchParams({
              page: String(page + 1 > totalPages ? page : page + 1),
            })
          }
        >
          <button
            className={classNames(
              "px-2 py-1 text-white  disabled:bg-slate-500",
              "bg-base hover:bg-white hover:text-gray-700  rounded-xl"
            )}
            disabled={page + 1 > totalPages}
          >
            Next
          </button>
        </Link>
      </div>
    </section>
  );
};
