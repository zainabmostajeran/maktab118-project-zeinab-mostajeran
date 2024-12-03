"use client";
import React from "react";
import Link from "next/link";
import { productsLimit } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { classNames } from "@/utils/classname";
import { getOrders } from "@/apis/services/orders";

export const OrderList: React.FC<{ page: number }> = ({ page }) => {
  const order = useQuery({
    queryKey: ["get-order"],
    queryFn: () => getOrders({ page: String(1), limit: String(productsLimit) }),
  });
  console.log(order.data);

  const totalPages = Math.max(
    Number(order.data?.total) / Number(productsLimit)
  );

  React.useEffect(() => {
    if (order.isSuccess && order.data) {
      console.log("Fetch successful", order.data);
    }
  }, [order.isSuccess, order.data]);

  React.useEffect(() => {
    if (order.error || order.isError) {
      console.error("Something went wrong", order.error);
    }
  }, [order.error, order.isError]);

  return (
    <section className="flex flex-col items-center justify-center ">
      {!order.isLoading ? (
        <table className="w-full text-white border-collapse border-slate-300 shadow-md overflow-scroll">
          <thead className="h-6">
            <tr className="bg-white text-center text-gray-800">
              <th className="h-12"></th>
              <th className="h-12">زمان سفارش</th>
              <th className="h-12"> مجموع مبلغ</th>
              <th className="h-12">نام کاربر</th>
            </tr>
          </thead>
          <tbody className="text-center bg-base text-gray-900 font-semibold">
            {order.data?.data?.orders?.map((item: any, index: number) => (
              <tr
                className="even:bg-second hover:even:bg-white cursor-pointer text-center"
                key={index}
              >
                <td className="h-12">بررسی سفارش</td>
                <td className="h-12">{item.createdAt}</td>
                <td className="h-12">{item.totalPrice}</td>
                <td className="h-12">{item.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-10 flex item-center justify-center text-nowrap">
          <Image
            className="animate-spin"
            src="/loading.svg"
            width={100}
            height={20}
            alt="Picture of the author"
          />
          <p> درحال بارگذاری</p>
        </div>
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
